import ScaleUnits from './ScaleUnits';
import { RoundNumbers } from '../utils';

const { moderateScale } = ScaleUnits;

const COLORS = {
    WHITE: 'white',
    BLACK: 'black',
    GRAY: '#4A4D4E',
    SEPERATOR_GRAY: '#999999',
    TRANSPARENT: 'transparent',
    DRAWER_BACKGROUND: 'rgba(0, 0, 0, 0.85)',
    SWITCH_TINT_COLOR: '#007C92',
    IOD_CATEGORY_BACKGROUND: 'rgba(255, 255, 255, 0.35)',
    BUTTON_BACKGROUND: '#666666',
    lineColor: '#CCCCCC',
    PRIMARY_RED: '#e60000',
    DASH_CARD_SECTION: 'rgba(255, 255, 255, 0.7)',
    DARK_GRAY: '#333333',
    LIGHT_GRAY: '#999999',
    GOLD: '#F1C40F',
    DRAWER_DIVIDER_COLOR: '#9D9D9D',
    DROPDOWN_BACK: 'rgba(0, 0, 0, 0.4)',
    SCREEN_HEADER_TRANSPARENCY: 'rgba(0, 0, 0, 0.4)',
    MyProfileBackground: '#EBEBEB'
};

const FONT_SIZES = {
    XXXLARGE: RoundNumbers(moderateScale(30, 0.2), 0),
    XXLARGE: RoundNumbers(moderateScale(28, 0.2), 0),
    XLARGE: RoundNumbers(moderateScale(25, 0.2), 0),
    LARGE: RoundNumbers(moderateScale(20, 0.2), 0),
    XXXMEDIUM: RoundNumbers(moderateScale(18, 0.2), 0),
    XXMEDIUM: RoundNumbers(moderateScale(16, 0.2), 0),
    XMEDIUM: RoundNumbers(moderateScale(15, 0.2), 0),
    MEDIUM: RoundNumbers(moderateScale(14, 0.2), 0),
    XXXSMALL: RoundNumbers(moderateScale(13, 0.2), 0),
    XXSMALL: RoundNumbers(moderateScale(12, 0.2), 0),
    XSMALL: RoundNumbers(moderateScale(10, 0.2), 0),
    SMALL: RoundNumbers(moderateScale(9, 0.2), 0),
};

const FONT_FAMILY = {
    VODAFONE_REGULAR: 'VodafoneRgRegular',
    VODAFONE_BOLD: 'VodafoneRgBold',
    VODAFONE_LITE: 'VodafoneLtRegular'
};

export default {
    COLORS,
    FONT_SIZES,
    FONT_FAMILY,
};
