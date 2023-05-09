import {
  Text,
  TouchableOpacity,
  View,
  Image,
  StyleSheet,
  ScrollView,
  Modal,
  Pressable,
} from "react-native";
import { COLORS, FONTS, Icons, SIZES, TEXT1 } from "../constants";
import { useRef, useState } from "react";
import React from "react";
import GestureRecognizer from "react-native-swipe-gestures";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";
import * as Brightness from "expo-brightness";
import OptionSelector from "../components/OptionSelector";

import AppLoading from "expo-app-loading";
import {
  useFonts,
  BalsamiqSans_400Regular,
} from "@expo-google-fonts/balsamiq-sans";
import { SourceSansPro_400Regular_Italic } from "@expo-google-fonts/source-sans-pro";
import { Inter_400Regular } from "@expo-google-fonts/inter";

export default function BookPages({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) {
  let [fontsLoaded] = useFonts({
    BalsamiqSans_400Regular,
    SourceSansPro_400Regular_Italic,
    Inter_400Regular,
  });

  const [book, setBook] = useState<any>([]);
  React.useEffect(() => {
    let { book } = route.params;
    setBook(book);
  }, [book]);

  const [modalVisible, setModalVisible] = useState(false);

  const [scrollViewWholeHeight, setScrollViewWholeHeight] = React.useState(1);
  const [scrollViewVisibleHeight, setScrollViewVisibleHeight] =
    React.useState(0);

  const [brightness, setBrightness] = React.useState(1);
  const [sizeOfText, setSizeOfText] = React.useState(SIZES.body2);

  const options = [
    "BalsamiqSans_400Regular",
    "SourceSansPro_400Regular_Italic",
    "Inter_400Regular",
  ];
  const [selectedOption, setSelectedOption] = useState(options[0]);
  const handleOptionSelected = (option: any) => {
    setSelectedOption(option);
  };

  // button back to top
  const scrollViewRef = useRef<ScrollView>(null);
  const buttonRef = useRef<TouchableOpacity>(null);

  const handleScroll = (event: any) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    if (buttonRef.current) {
      if (offsetY > 0) {
        // Show the button when scrolled down
        buttonRef.current.setNativeProps({ style: { opacity: 0.6 } });
      } else {
        // Hide the button when at the top of the screen
        buttonRef.current.setNativeProps({ style: { opacity: 0 } });
      }
    }
  };

  const handlePress = () => {
    // Scroll back to the top of the screen
    scrollViewRef.current?.scrollTo({ x: 0, y: 0, animated: true });
  };

  if (book && !fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View style={styles.container}>
        <View
          style={{
            flexDirection: "row",
            paddingHorizontal: SIZES.radius,
            height: 80,
            alignItems: "flex-end",
          }}
        >
          <TouchableOpacity
            style={{ marginLeft: SIZES.base }}
            onPress={() => navigation.goBack()}
          >
            <Image
              source={Icons.back_arrow_icon}
              resizeMode="contain"
              style={{
                width: 25,
                height: 25,
                tintColor: COLORS.lightGray2,
              }}
            />
          </TouchableOpacity>

          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text
              style={{ ...FONTS.h2, color: COLORS.lightGray2, maxWidth: 200 }}
              ellipsizeMode="tail"
              numberOfLines={1}
            >
              {book.title}
            </Text>
          </View>

          <TouchableOpacity
            style={{ marginRight: SIZES.base }}
            onPress={() => setModalVisible(true)}
          >
            <Image
              source={Icons.more_icon}
              resizeMode="contain"
              style={{
                width: 30,
                height: 30,
                tintColor: COLORS.lightGray2,
                alignSelf: "flex-end",
              }}
            />
          </TouchableOpacity>
        </View>

        <View style={{ flex: 1 }}>
          <View
            style={{ flex: 1, flexDirection: "row", padding: SIZES.padding }}
          >
            <ScrollView
              contentContainerStyle={{ paddingRight: 0 }}
              showsVerticalScrollIndicator={true}
              indicatorStyle="white"
              scrollEventThrottle={16}
              // onContentSizeChange={(width, height) => {
              //   setScrollViewWholeHeight(height);
              // }}
              // onLayout={({
              //   nativeEvent: {
              //     layout: { x, y, width, height },
              //   },
              // }) => {
              //   setScrollViewVisibleHeight(height);
              // }}
              ref={scrollViewRef}
              onScroll={handleScroll}
            >
              <Text
                style={{
                  fontSize: sizeOfText,
                  color: COLORS.lightGray2,
                  fontFamily: selectedOption,
                }}
              >
                {TEXT1}
              </Text>
            </ScrollView>

            <TouchableOpacity
              ref={buttonRef}
              style={styles.backToTopButton}
              onPress={handlePress}
            >
              <AntDesign name="arrowup" size={30} color="black" />
            </TouchableOpacity>
          </View>
        </View>

        <GestureRecognizer
          onSwipeUp={() => setModalVisible(true)}
          onSwipeDown={() => setModalVisible(false)}
        >
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}
          >
            <View style={styles.modal}>
              <View style={styles.modalView}>
                <View style={styles.brightness}>
                  <Ionicons name="md-sunny-outline" size={35} color="#36454f" />
                  <View
                    style={{ flex: 1, paddingHorizontal: SIZES.padding / 1.5 }}
                  >
                    <Slider
                      minimumTrackTintColor="#36454f"
                      maximumTrackTintColor="#fffffa"
                      maximumValue={1}
                      minimumValue={0}
                      step={0.1}
                      value={brightness}
                      onValueChange={(brightness) => {
                        setBrightness(brightness);
                        async () => {
                          const { status } =
                            await Brightness.requestPermissionsAsync();
                          console.log(status);
                          if (status === "granted") {
                            Brightness.setBrightnessAsync(brightness);
                          }
                        };
                      }}
                    />
                  </View>
                  <Ionicons name="md-sunny" size={35} color="#36454f" />
                </View>

                <View style={styles.ButtonFontSize}>
                  <Pressable
                    style={[styles.button, { backgroundColor: "#1E5F74" }]}
                    onPress={() => {
                      setSizeOfText(SIZES.body3);
                    }}
                  >
                    <Text style={{ ...FONTS.body3, color: COLORS.white }}>
                      Abc
                    </Text>
                  </Pressable>

                  <Pressable
                    style={[styles.button, { backgroundColor: "#133B5C" }]}
                    onPress={() => {
                      setSizeOfText(SIZES.body2);
                    }}
                  >
                    <Text style={{ ...FONTS.body2, color: COLORS.white }}>
                      Abc
                    </Text>
                  </Pressable>

                  <Pressable
                    style={[styles.button, { backgroundColor: "#1D2D50" }]}
                    onPress={() => {
                      setSizeOfText(SIZES.body1);
                    }}
                  >
                    <Text style={{ ...FONTS.body1, color: COLORS.white }}>
                      Abc
                    </Text>
                  </Pressable>
                </View>

                <View style={styles.FontSelector}>
                  <OptionSelector
                    options={options}
                    defaultOptionIndex={0}
                    onOptionSelected={handleOptionSelected}
                  />
                </View>
              </View>
            </View>
          </Modal>
        </GestureRecognizer>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.black,
  },
  header: {
    paddingTop: SIZES.padding,
    paddingHorizontal: SIZES.padding,
  },
  headerText: {
    ...FONTS.h2,
    color: COLORS.white,
    fontWeight: "700",
  },
  books: {
    padding: SIZES.padding,
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  modal: {
    flex: 1,
    justifyContent: "flex-end",
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
    height: 400,
    backgroundColor: "#dddbcb",
    borderRadius: 20,
    padding: SIZES.padding,
    paddingTop: SIZES.padding2,
  },
  brightness: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  ButtonFontSize: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 1,
    paddingHorizontal: 40,
    borderRadius: 8,
  },
  FontSelector: {
    flex: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  backToTopButton: {
    position: "absolute",
    right: "48%",
    bottom: 30,
    backgroundColor: COLORS.white,
    color: COLORS.lightGray,
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    opacity: 0,
  },
});
