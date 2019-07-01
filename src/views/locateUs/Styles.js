import { StyleSheet } from 'react-native';
import { ScaleUnits, Constants } from '../../config';

const { scale, verticalScale, moderateScale } = ScaleUnits;
const { FONT_FAMILY, COLORS, FONT_SIZES } = Constants;

export default Styles = StyleSheet.create({
    screenContainerStyle: {
        flex: 1,
        // paddingHorizontal: scale(10),
        // paddingBottom: verticalScale(20),
    },
    findTextStyle: {
        fontSize: FONT_SIZES.XXXMEDIUM,
        fontFamily: FONT_FAMILY.VODAFONE_REGULAR,
        lineHeight: moderateScale(21, 0.2),
        color: COLORS.WHITE,
        textAlign: 'center',
        marginBottom: verticalScale(10),
    },
    dropDownContainerStyle: {
        flex: 0.2,
        backgroundColor: COLORS.DROPDOWN_BACK,
        paddingTop: scale(25),
        paddingBottom: scale(25),
    },
    modalContainerStyle: {
        height: verticalScale(45),
        marginTop: verticalScale(14),
        marginLeft: scale(20),
        marginRight: scale(20),
    },
    modalSelectorStyle: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#ffffff',
        borderRadius: 5,
        height: scale(45),
        padding: scale(10)
    },
    modalSelectorTextStyle: {
        fontSize: scale(18),
        color: '#666666',
        fontFamily: 'VodafoneRgRegular',
    },
    mapContainerStyle: {
        left: 0,
        right: 0,
        bottom: 0,
        top: 0,
        position: 'absolute',
        flex: 1
    },
    mapStyle: {
        ...StyleSheet.absoluteFillObject,
    },
    storeDetailsPanelStyle: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: scale(180),
        elevation: 2,
    },
    myLocationIcon: {
        width: scale(44), height: scale(44), borderRadius: 100 / 2
    },
    locationMarkerIcon: {
        width: scale(20), height: scale(31)
    },
    touchableView: {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        position: 'absolute',
        backgroundColor: 'transparent'
    },
    imageStyle: {
        height: scale(20),
        width: scale(20),
        resizeMode: 'cover',
        marginRight: scale(10)
      }
});
