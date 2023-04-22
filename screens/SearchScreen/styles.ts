import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../constants";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.black,
  },
  header: {
    // paddingVertical: 10,
    height: 180,

    // flexDirection: "row",
  },
  fieldInput: {
    flex: 1,
    flexDirection: "row",
    paddingHorizontal: SIZES.padding,
    alignItems: "center",
    backgroundColor: "#25282F",
  },
  input: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 0.5,
    borderColor: "#25282F",
    padding: 13,
    borderRadius: 10,
    marginVertical: 5,
    marginRight: SIZES.padding / 2,
  },
  boxInput: {
    flex: 1,
    color: "white",
    lineHeight: 20,
  },
  tabs: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginHorizontal: SIZES.padding,
    marginVertical: SIZES.padding / 2,
    paddingTop: SIZES.padding / 2,
  },
  buttonTabs1: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: SIZES.base,
    marginRight: SIZES.base,
    backgroundColor: COLORS.primary,
    height: 40,
    borderRadius: SIZES.radius,
  },
  buttonTabs2: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: SIZES.base,
    marginRight: SIZES.base,
    backgroundColor: COLORS.lightGray3,
    height: 40,
    borderRadius: SIZES.radius,
  },
  textTabs1: {
    fontWeight: "700",
    color: COLORS.white,
  },
  textTabs2: {
    fontWeight: "700",
    color: COLORS.lightGray,
  },
});
