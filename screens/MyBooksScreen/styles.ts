import { FontAwesome } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
import { COLORS, SIZES, FONTS } from "../../constants";


export default StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: COLORS.black,
    },
    header: {
      paddingTop: SIZES.padding,
      paddingHorizontal:  SIZES.padding,
    },
    headerText: {
      ...FONTS.h2, 
      color: COLORS.white,
      fontWeight: "700"
    },
    books:{ 
      padding: SIZES.padding,
      flex: 1
    },
    title: {
      fontSize: 20,
      fontWeight: "bold",
    },
    separator: {
      marginVertical: 30,
      height: 1,
      width: "80%",
    },
  });
  