export const COLORS = {
    // base colors
    primary: "#F96D41",
    secondary: "#25282F",

    // colors
    black: "#15141a",
    white: "#FFFFFF",
    yellow: "#F7C04A",
    lightGray: "#64676D",
    lightGray4: '#7D7E84',

    lightGray2: "#EFEFF0",
    lightGray3: '#D4D5D6',
  
    gray: "#2D3038",
    gray1: "#282C35",
    darkRed: "#31262F",
    lightRed: "#C5505E",
    darkBlue: "#22273B",
    lightBlue: "#424BAF",
    darkGreen: "#213432",
    lightGreen: "#31Ad66",

};

export const lightTheme = {
    primary: "#ffb26e",
    secondary: "#EBEBEB",
    backgroundColor: '#FBFBFB',
    textColor: '#000',
    backgroundInputColor: "#eee",
    gray: "#64676D",
    authorColor: "#aaa",
    inforColor: "#888",
    red: "#FF9F9F",
    textRed: "#EF4B4B",
    backgroundModal: "#FFFBF5",
    buttonTextSmall:"#FFC884",
    buttonTextMedium: "#FFC27E",
    buttonTextLarge: "#FFBA76"
  };
  
  export const darkTheme = {
    primary: "#F96D41",
    secondary: "#D4D5D6",
    backgroundColor: '#000',
    textColor: '#fff',
    backgroundInputColor: "#252525",
    gray: "#7D7E84",
    authorColor: "#777", 
    inforColor: "#d4d4d4",
    red: "#31262F",
    textRed: "#C5505E",
    backgroundModal: "#F4EEE0",
    buttonTextSmall:"#ff8357",
    buttonTextMedium: "#ff7d51",
    buttonTextLarge: "#ff7549"
  };

export const SIZES = {
    // global sizes
    base: 8,
    font: 14,
    radius: 12,
    padding: 24,
    padding2: 36,

    // font sizes
    largeTitle: 50,
    h1: 30,
    h2: 22,
    h3: 16,
    h4: 14,
    body1: 30,
    body2: 20,
    body3: 16,
    body4: 14,
};


export const FONTS = {
    largeTitle: { fontSize: SIZES.largeTitle, lineHeight: 55 },
    h1: {  fontSize: SIZES.h1, lineHeight: 36 },
    h2: {  fontSize: SIZES.h2, lineHeight: 30 },
    h3: {  fontSize: SIZES.h3, lineHeight: 22 },
    h4: {  fontSize: SIZES.h4, lineHeight: 22 },
    body1: {  fontSize: SIZES.body1, lineHeight: 36 },
    body2: {  fontSize: SIZES.body2, lineHeight: 30 },
    body3: {  fontSize: SIZES.body3, lineHeight: 22 },
    body4: {  fontSize: SIZES.body4, lineHeight: 22 },
};

const appTheme = { COLORS, SIZES, FONTS, lightTheme, darkTheme };

export default appTheme;