import { StyleSheet } from "react-native";
import { COLORS, FONTS, SIZES } from "../../constants";

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
    paddingVertical: SIZES.padding / 2,
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

  modal: {
    flex: 1,
    shadowColor: "#dddbcb",
    shadowOffset: {
      width: 0,
      height: -10,
    },
    shadowOpacity: 0.5,
    shadowRadius: 20.0,
    elevation: 24,
  },
  modalView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#dddbcb",
    borderRadius: 20,
    padding: SIZES.padding,
    paddingTop: SIZES.padding2,
  },
  textFilter: {
    fontSize: 23,
    fontWeight: "800",
    lineHeight: 40,
  }
});
