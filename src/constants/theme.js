import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

export const  widthPercentToDp = widthPercent => {
    const screenWidth = Dimensions.get("window").width;
    return Math.round(screenWidth * parseFloat(widthPercent) / 100);
}
export const heightPercentToDp = heightPercent => {
    const screenHeight = Dimensions.get("window").height;
    return Math.round(screenHeight * parseFloat(heightPercent) / 100);
}

export const COLORS = {
    // base colors
    primary: "#FC6D3F", // orange
    secondary: "#CDCDD2",   // gray

    // colors
    black: "#1E1F20",
    white: "#FFFFFF",

    lightGray: "#F5F5F6",
    lightGray2: "#F6F6F7",
    lightGray3: "#EFEFF1",
    lightGray4: "#F8F8F9",
    transparent: "transparent",
    darkgray: '#898C95',
    blue: '#4A90E2',
    primary: "#FF6C44", //orange
    transparentPrimary: 'rgba(227, 120, 75, 0.4)',
    orange: "#FFA133",
    lightOrange: "#FFA133",
    lightOrange2: "#FDDED4",
    lightOrange3: '#FFD9AD',
    green: "#27AE60",
    red: "#FF1717",
    blue: '#0064C0',
    darkBlue: "#111A2C",
    darkGray: "#525C67",
    darkGray2: "#757D85",
    gray: "#898B9A",
    gray2: "#BBBDC1",
    gray3: '#CFD0D7',
    lightGray1: "#DDDDDD",
    lightGray2: "#F5F5F8",
    white2: "#FBFBFB",
    white: '#FFFFFF',
    black: "#000000",

    transparent: 'transparent',
    transparentBlack1: "rgba(0, 0, 0, 0.1)",
    transparentBlack7: "rgba(0, 0, 0, 0.7)"

    
};

export const SIZES = {
    // global sizes
    base: 5,
    font: 14,
    radius: 30,
    padding: 10,
    padding2: 12,

    // font sizes
    largeTitle: 50,
    h1: 30,
    h2: 22,
    h3: 20,
    h4: 18,
    h5: 16,
    body1: 30,
    body2: 20,
    body3: 16,
    body4: 14,
    body5: 12,

    // app dimensions
    width,
    height
    
};

export const FONTS = {
    largeTitle: { fontFamily: "Roboto-regular", fontSize: SIZES.largeTitle, lineHeight: 55 },
    h1: { fontFamily: "Roboto-Black", fontSize: SIZES.h1, lineHeight: 36 },
    h2: { fontFamily: "Roboto-Bold", fontSize: SIZES.h2, lineHeight: 30 },
    h3: { fontFamily: "Roboto-Bold", fontSize: SIZES.h3, lineHeight: 22 },
    h4: { fontFamily: "Roboto-Bold", fontSize: SIZES.h4, lineHeight: 22 },
    h5: { fontFamily: "Roboto-Bold", fontSize: SIZES.h5, lineHeight: 22 },
    h6: { fontFamily: "Roboto-Bold", fontSize: SIZES.h6, lineHeight: 20 },
    body1: { fontFamily: "Roboto-Regular", fontSize: SIZES.body1, lineHeight: 36 },
    body2: { fontFamily: "Roboto-Regular", fontSize: SIZES.body2, lineHeight: 30 },
    body3: { fontFamily: "Roboto-Regular", fontSize: SIZES.body3, lineHeight: 22 },
    body4: { fontFamily: "Roboto-Regular", fontSize: SIZES.body4, lineHeight: 22 },
    body5: { fontFamily: "Roboto-Regular", fontSize: SIZES.body5, lineHeight: 22 },
    BalooBold: { fontFamily: "Baloo-Bhai2-Bold", fontSize: SIZES.body1, lineHeight: 36 },
    BalooExtra: { fontFamily: "BalooBhai2-ExtraBold", fontSize: SIZES.body1, lineHeight: 36 },
    BalooRegular: { fontFamily: "BalooBhai2-Regular", fontSize: SIZES.body1, lineHeight: 36 },
    LatoBoldItalic: { fontFamily: "Lato-BoldItalic", fontSize: SIZES.body1, lineHeight: 36 },
};

const appTheme = { COLORS, SIZES, FONTS };

export default appTheme;