import React, { Component } from 'react';
import {
  Text, View, Image, TouchableOpacity,
  ImageBackground, Linking
} from 'react-native';
import { ScaleUnits, Images, Constants } from '../../config';

const { scale, verticalScale } = ScaleUnits;
const { VODAFONE_REGULAR } = Constants.FONT_FAMILY;

export default class StoreDetailsPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedMarker: {}
    };
  }

  componentWillReceiveProps(newProps) {
    this.setState({ selectedMarker: newProps.selectedMarker });
  }

  openNativeMaps() {
    const lat = this.state.selectedMarker.latitude;
    const long = this.state.selectedMarker.longitude;
    Linking.openURL(`http://maps.google.com/maps?daddr=${lat},${long}`);
  }

  render() {
    const {
      storeDetailsPanelStyle, storeTitleTextStyle, storeDetailsTextStyle, imageStyle, close
    } = styles;
    let uri;
    let name = '';
    let address = '';
    let phone = '';
    if (this.state.selectedMarker) {
      // uri = `${baseImageUrl}/${this.state.selectedMarker.imageName}`;
      name = this.state.selectedMarker.name;
      address = this.state.selectedMarker.address;
      phone = this.state.selectedMarker.phone;
    }


    return (
      <ImageBackground style={storeDetailsPanelStyle} source={Images.StoreDetailsPanelBackground} >
        <TouchableOpacity
          style={{ flexDirection: 'row', justifyContent: 'flex-end', paddingRight: scale(5), paddingTop: verticalScale(5) }}
          onPress={() => this.props.toggleDialog()}
        >
          <Image style={close} source={Images.Cancel} />
        </TouchableOpacity>
        <View style={{ flexDirection: 'row', paddingRight: scale(18) }}>
          <View style={{ height: scale(141), width: scale(141), backgroundColor: '#939294', borderRadius: 5 }}>
            {
              this.state.selectedMarker ?
                <Image
                  style={{ height: scale(141), width: scale(141), resizeMode: 'contain', borderRadius: 5 }}
                  source={Images.LocationMarker}
                />
                :
                null
            }
          </View>
          <View style={{ marginLeft: scale(10), flex: 1 }}>
            <Text style={storeTitleTextStyle}>{name}</Text>

            <Text style={[storeDetailsTextStyle, { color: '#000000' }]}>Address :
                <Text style={storeDetailsTextStyle}>{address}</Text>
            </Text>

            <Text style={[storeDetailsTextStyle, { color: '#000000' }]}>Phone :
                <Text style={storeDetailsTextStyle}>{phone}</Text>
            </Text>

            <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'flex-end', }}>
              <TouchableOpacity onPress={() => this.openNativeMaps()}>
                <Image style={imageStyle} source={Images.GetDirections} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ImageBackground>
    );
  }
}

const styles = {
  storeDetailsPanelStyle: {
    height: scale(180),
    paddingLeft: scale(18),
    paddingBottom: verticalScale(18),
    marginTop: scale(5)
  },
  storeTitleTextStyle: {
    color: '#000000',
    fontFamily: VODAFONE_REGULAR,
    fontWeight: 'bold',
    fontSize: scale(16),
    marginBottom: verticalScale(3),
  },
  storeDetailsTextStyle: {
    color: '#767676',
    fontFamily: VODAFONE_REGULAR,
    fontSize: scale(12),
    marginVertical: verticalScale(3)
  },
  imageStyle: {
    height: scale(57),
    width: scale(57),
    resizeMode: 'cover',
  },
  close: {
    height: scale(18),
    width: scale(18),
    resizeMode: 'cover',
  }
};
