import React, { Component } from 'react';
import {
    View, Dimensions, Alert, Animated, BackHandler, PermissionsAndroid, Image
} from 'react-native';
import MapView from 'react-native-maps';

import { ScaleUnits, Images } from '../../config';
import { Utils } from '../../utils';
import { Styles, StoreDetailsPanel } from './index';
import { Header } from '../../components'

const utils = new Utils();

const { scale } = ScaleUnits;

const { LocationMarker } = Images;
const { storeDetailsPanelStyle,mapContainerStyle, mapStyle, locationMarkerIcon } = Styles;

//Store details panel is hidden by default
let isHidden = true;
//Screen dimensions
const { height } = Dimensions.get('window');
const LATITUDE_DELTA = 0.1;
const LONGITUDE_DELTA = 0.1;

export default class LocateUs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            backgroundImageData: props.backgroundImageData,
            region: {                
                latitude: 6.718669,
                longitude: 80.7715082,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA, 
            },
            userLocation: null,
            isAppLogoutAlertDialog: false,
            nearbyData: null,
            outletListData: [
                {
                    latitude: '6.715226',
                    longitude: '80.769997',
                    name: 'River Garden Resort',
                    phone:'0774152639',
                    address: 'River Garden Resort, Belihuloya, Sri lanka'
                },
                {
                    latitude: '6.718311',
                    longitude: '80.769684',
                    name: 'Belihuloya Rest House',
                    phone:'0777895623',
                    address: 'Belihuloya Rest House, Belihuloya, Sri lanka'
                },
                {
                    latitude: '6.721721',
                    longitude: '80.773117',
                    name: 'Water Garden',
                    phone:'0711516121',
                    address: 'Water Garden, Belihuloya, Sri lanka'
                },
                {
                    latitude: '6.722104',
                    longitude: '80.768397',
                    name: 'Belpeak Cottage, Belihuloya',
                    phone:'0718451623',
                    address: 'Belpeak Cottage, Belihuloya, Sri lanka'
                },
                {
                    latitude: '6.724577',
                    longitude: '80.775695',
                    name: 'Natures Cottage',
                    phone:'0774658962',
                    address: 'Natures Cottage, Belihuloya, Sri lanka'
                },
                {
                    latitude: '6.714192',
                    longitude: '80.787222',
                    name: 'CEB Circuit Bunglow Pambahinna',
                    phone:'0785869142',
                    address: 'CEB Circuit Bunglow Pambahinna, Belihuloya, Sri lanka'
                },
                {
                    latitude: '6.705568',
                    longitude: '80.786689',
                    name: 'Horton Villa',
                    phone:'0716458956',
                    address: 'Horton Villa, Belihuloya, Sri lanka'
                },
                {
                    latitude: '6.708962',
                    longitude: '80.761846',
                    name: 'Landa Holiday Houses',
                    phone:'0777568941',
                    address: 'Landa Holiday Houses, Belihuloya, Sri lanka'
                },
                {
                    latitude: '6.726714',
                    longitude: '80.760508',
                    name: 'Citrine River Residence',
                    phone:'0715566998',
                    address: 'Citrine River Residence, Belihuloya, Sri lanka'
                },
                {
                    latitude: '6.700285',
                    longitude: '80.790346',
                    name: 'Windy Hills Banglow',
                    phone:'0717889944',
                    address: 'Windy Hills Banglow, Belihuloya, Sri lanka'
                }
            ],
            selectedMarker: null,
            ready: true,
            isFetching: '',
            selectedRegion: 'Select a region',
            isAlertDialogVisible: false, //Alert dialog hidden by default
            regions: ['Central/Eastern', 'Western', 'Northern'],
            isGeneralErrorAlertDialogVisible: false,
            isNetworkErrorAlertDialogVisible: false,
            isBEErrorAlertDialogVisible: false,
            beErrorMsg: '',
            //Initial position of the store details panel which is the height of the window
            bounceValue: new Animated.Value(height),
        };
        this.map = null;
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    }

    componentWillMount() {
        BackHandler.addEventListener('handleBackPress', this.handleBackButtonClick);
    }

    componentDidMount() {
        this.requestPermission();
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('handleBackPress', this.handleBackButtonClick);
    }

    onSelectRegion(region) {
        let changeRegion;
        if (region == 'Western') {
            changeRegion = {
                latitude: -17.756105,
                longitude: 177.840822,
                latitudeDelta: 0.9,
                longitudeDelta: 0.9
            };
        } else if (region == 'Northern') {
            changeRegion = {
                latitude: -16.431294,
                longitude: 179.362822,
                latitudeDelta: 0.75,
                longitudeDelta: 0.75
            };
        } else if (region == 'Central/Eastern') {
            changeRegion = {
                latitude: -18.124799,
                longitude: 178.450585,
                latitudeDelta: 0.75,
                longitudeDelta: 0.75
            };
        }
        this.map.animateToRegion(changeRegion, 1);
        this.setState({ selectedRegion: region }, () => {
            this.toggleAlertDialog();
        });
    }

    onRegionChange(region) {
        console.debug('*** onRegionChange');
    }

    onRegionChangeComplete = (region) => {
        console.debug('*** onRegionChangeComplete');
    };

    onMapReady = (e) => {
        if (!this.state.ready) {
            this.setState({ ready: true });
        }
    };

    getCurrentPosition() {
        console.log('getCurrentPosition ')

        try {
            console.log('getCurrentPosition try ')
            console.log('getCurrentPosition geolocation ', navigator.geolocation)

            navigator.geolocation.getCurrentPosition(
                (position) => {
                    console.log('getCurrentPosition position ', position)
                    const region = {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        latitudeDelta: LATITUDE_DELTA,
                        longitudeDelta: LONGITUDE_DELTA,
                    };
                    this.setState({ region, userLocation: region });
                },
                (error) => {
                    console.log('getCurrentPosition error ', error)
                }
            );
        } catch (e) {
            Alert.alert(
                'Requesting for GPS service permission',
                'Please turn on GPS service to use near by outlets feature',
                [
                    { text: 'OK', onPress: () => { if (__DEV__) console.log('OK pressed'); } },
                ],
                { cancelable: false }
            );
        }
    }

    async requestPermission() {
        let locationPermission = await utils.requestPermission('LOCATION');

        if (locationPermission == PermissionsAndroid.RESULTS.GRANTED || locationPermission) {
            this.getCurrentPosition();
        } else {
            Alert.alert(
                'Requesting Location service permission',
                'Please grant location permission to access this Feature',
                [
                    { text: 'Cancel', onPress: () => { if (__DEV__) console.log('*** location permission not allowed'); } },
                    {
                        text: 'OK',
                        onPress: async () => {
                            this.requestPermission();
                        }
                    },
                ],
                { cancelable: false }
            );
        }
    }

    toggleStoreDetailsPanel() {
        //Panel should expand distance of its height.
        let toValue = scale(180);
        if (isHidden) {
            toValue = 0;
        }

        //Animate the panel to expand.
        //The new toValue itoggleStoreDetailsPanels set to the panel height
        Animated.spring(
            this.state.bounceValue, {
                toValue,
                velocity: 3,
                tension: 2,
                friction: 8,
            }
        ).start();
        isHidden = !isHidden;
    }

    markerOnPress(location) {

        if (this.state.selectedMarker == location) {
            this.toggleStoreDetailsPanel();
        } else {
            if (isHidden) {
                this.toggleStoreDetailsPanel();
            }

            this.setState({ selectedMarker: location });
        }
    }

    scrollHandler(value) {
        this.setState({ enabled: value });
    }

    handleBackButtonClick() {
        return true;
    }

    toggleAlertDialog = () => {
        this.setState({ isAlertDialogVisible: !this.state.isAlertDialogVisible });
    }

    viewOnPress() {
        if (isHidden) {
            this.toggleStoreDetailsPanel();
        }
    }

    renderOutletList() {
        return this.state.outletListData.map((location, index) => {
            return (
                <MapView.Marker
                    key={index}
                    coordinate={{ latitude: parseFloat(location.latitude), longitude: parseFloat(location.longitude) }}
                    onPress={() => this.markerOnPress(location)}
                >
                    <Image source={LocationMarker} style={locationMarkerIcon} />
                </MapView.Marker>
            );
        });
    }

    render() {
        const selectedMarker = this.state.selectedMarker;
        return (
            <View style={{ flex: 1 }}>
                <View style={{ flex: 0.1 }}>
                    <Header />
                </View>
                <View style={{ flex: 0.9 }}>
                    <View style={mapContainerStyle} >
                        <MapView
                            ref={map => { this.map = map; }}
                            onMapReady={this.onMapReady}
                            onRegionChange={this.onRegionChange}
                            onRegionChangeComplete={this.onRegionChangeComplete}
                            style={mapStyle}
                            initialRegion={this.state.region}
                            zoomControlEnabled
                            showsUserLocation
                        >
                            {this.renderOutletList()}
                        </MapView>
                    </View>
                </View>
                <Animated.View
                    style={[storeDetailsPanelStyle, {
                        transform: [{ translateY: this.state.bounceValue }]
                    }]}
                >
                    <StoreDetailsPanel selectedMarker={selectedMarker} toggleDialog={() => this.toggleStoreDetailsPanel()} />
                </Animated.View>
            </View>
        );
    }
}

