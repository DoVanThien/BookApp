import {
  Text,
  TouchableOpacity,
  View,
  Image,
  StyleSheet,
  ScrollView,
  Modal,
} from "react-native";
import { COLORS, FONTS, Icons, SIZES, TEXT1, TEXT2, TEXT3 } from "../constants";
import { useRef, useState, useContext } from "react";
import React from "react";
import GestureRecognizer from "react-native-swipe-gestures";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";
import AppLoading from "expo-app-loading";
import * as Brightness from "expo-brightness";
import { BlurView } from "expo-blur";

import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  useFonts,
  BalsamiqSans_400Regular,
} from "@expo-google-fonts/balsamiq-sans";
import { SourceSansPro_400Regular_Italic } from "@expo-google-fonts/source-sans-pro";
import { Inter_400Regular } from "@expo-google-fonts/inter";

import OptionSelector from "../components/OptionSelector";
import { ThemeContext } from "../context/ThemeContextProvider";

export default function BookPages({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) {
  const { theme } = useContext(ThemeContext);
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.backgroundColor,
    },
    header: {
      paddingTop: SIZES.padding,
      paddingHorizontal: SIZES.padding,
    },
    books: {
      padding: SIZES.padding,
      flex: 1,
    },
    title: {
      ...FONTS.h2,
      color: theme.textColor,
      maxWidth: 230,
      paddingLeft: 40,
    },
    modal: {
      flex: 1,
      justifyContent: "flex-end",
      shadowColor: theme.gray,
      shadowOffset: {
        width: 0,
        height: -4,
      },
      shadowOpacity: 0.7,
      shadowRadius: 10,
      elevation: 10,
    },
    modalView: {
      height: 400,
      backgroundColor: theme.backgroundModal,
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
      backgroundColor: theme.secondary,
      color: theme.gray,
      borderRadius: 16,
      paddingHorizontal: 16,
      paddingVertical: 12,
      opacity: 0,
    },

    //modal top
    modalContainer: {
      flex: 1,
      position: "relative",
      top: 100,
      left: "27%",
      shadowColor: theme.gray,
      shadowOffset: {
        width: 4,
        height: 4,
      },
      shadowOpacity: 0.5,
      shadowRadius: 5.0,
      elevation: 10,
    },
    modalChapter: {
      backgroundColor: theme.backgroundModal,
      borderRadius: SIZES.radius,
      padding: SIZES.padding,
      height: 200,
      width: "60%",
      justifyContent: "center",
      alignItems: "center",
    },
    chapterOption: {
      borderBottomWidth: 1,
      borderBottomColor: COLORS.lightGray,
      paddingVertical: SIZES.padding / 2,
      width: "100%",
      alignItems: "center",
    },
    chapterOptionText: {
      ...FONTS.h3,
      color: COLORS.secondary,
    },
    blurContainer: {
      flex: 1,
      justifyContent: "center",
    },
  });

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

  const [optionModalVisible, setOptionModalVisible] = useState(false);
  const [chapterModalVisible, setChapterModalVisible] = useState(false);

  const [selectedChapter, setSelectedChapter] = useState("Chapter1");
  const selectChapter = (chapter: any) => {
    setSelectedChapter(chapter);
    setChapterModalVisible(false);
  };
  const chapterText =
    selectedChapter === "Chapter1"
      ? TEXT1
      : selectedChapter === "Chapter2"
      ? TEXT2
      : TEXT3;

  const [brightness, setBrightness] = React.useState(1);
  const [sizeOfText, setSizeOfText] = React.useState(SIZES.body2);

  const options = [
    "BalsamiqSans_400Regular",
    "SourceSansPro_400Regular_Italic",
    "Inter_400Regular",
  ];
  const [selectedOption, setSelectedOption] = useState(options[0]);
  const handleOptionSelected = (option: any) => {
    handleSelectedOptionChange(option);
  };
  const handleBrightnessChange = async (brightness: any) => {
    setBrightness(brightness);
    await AsyncStorage.setItem("brightness", JSON.stringify(brightness));
  };

  const handleSizeOfTextChange = async (size: any) => {
    setSizeOfText(size);
    await AsyncStorage.setItem("sizeOfText", JSON.stringify(size));
  };

  const handleSelectedOptionChange = async (option: any) => {
    setSelectedOption(option);
    await AsyncStorage.setItem("selectedOption", option);
  };
  React.useEffect(() => {
    const loadSavedValues = async () => {
      try {
        const brightnessValue = await AsyncStorage.getItem("brightness");
        const sizeValue = await AsyncStorage.getItem("sizeOfText");
        const optionValue = await AsyncStorage.getItem("selectedOption");

        if (brightnessValue !== null) {
          setBrightness(JSON.parse(brightnessValue));
        } else {
          setBrightness(1); // default value
        }

        if (sizeValue !== null) {
          setSizeOfText(JSON.parse(sizeValue));
        } else {
          setSizeOfText(SIZES.body2); // default value
        }

        if (optionValue !== null) {
          setSelectedOption(optionValue);
        } else {
          setSelectedOption(options[0]); // default value
        }
      } catch (e) {
        console.log(e);
      }
    };

    loadSavedValues();
  }, []);

  //button back to top
  const scrollViewRef = useRef<ScrollView>(null);
  const buttonRef = useRef<TouchableOpacity>(null);

  const handleScroll = (event: any) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    if (buttonRef.current) {
      if (offsetY > 0) {
        buttonRef.current.setNativeProps({ style: { opacity: 0.7 } });
      } else {
        buttonRef.current.setNativeProps({ style: { opacity: 0 } });
      }
    }
  };

  const handlePress = () => {
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
            height: 90,
            alignItems: "flex-end",
            justifyContent: "space-between",
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
                tintColor: theme.gray,
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
            <Text style={styles.title} ellipsizeMode="tail" numberOfLines={1}>
              {book.title}
            </Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              style={{ marginRight: SIZES.base }}
              onPress={() => setChapterModalVisible(true)}
            >
              <Image
                source={Icons.page_icon}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                  tintColor: theme.gray,
                  alignSelf: "flex-end",
                }}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={{ marginRight: SIZES.base }}
              onPress={() => setOptionModalVisible(true)}
            >
              <Image
                source={Icons.more_icon}
                resizeMode="contain"
                style={{
                  width: 30,
                  height: 30,
                  tintColor: theme.gray,
                  alignSelf: "flex-end",
                }}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ flex: 1 }}>
          <View
            style={{ flex: 1, padding: SIZES.padding }}
          >
            <ScrollView
              contentContainerStyle={{ paddingRight: 0 }}
              showsVerticalScrollIndicator={true}
              indicatorStyle="white"
              scrollEventThrottle={16}
              ref={scrollViewRef}
              onScroll={handleScroll}
            >
              <Text
                style={{
                  fontSize: sizeOfText,
                  color: theme.inforColor,
                  fontFamily: selectedOption,
                }}
              >
                {chapterText}
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

        <GestureRecognizer onSwipeDown={() => setOptionModalVisible(false)}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={optionModalVisible}
            onRequestClose={() => {
              setOptionModalVisible(!optionModalVisible);
            }}
          >
            <View style={styles.modal}>
              <View style={styles.modalView}>
                <View style={styles.brightness}>
                  <Ionicons name="md-sunny-outline" size={35} color={theme.gray} />
                  <View
                    style={{ flex: 1, paddingHorizontal: SIZES.padding / 1.5 }}
                  >
                    <Slider
                      minimumTrackTintColor={theme.gray}
                      maximumTrackTintColor={theme.secondary}
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
                  <Ionicons name="md-sunny" size={35} color={theme.gray} />
                </View>

                <View style={styles.ButtonFontSize}>
                  <TouchableOpacity
                    style={[styles.button, { backgroundColor: theme.buttonTextSmall }]}
                    onPress={() => {
                      handleSizeOfTextChange(SIZES.body3);
                    }}
                  >
                    <Text style={{ ...FONTS.body3, color: COLORS.white }}>
                      Abc
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[styles.button, { backgroundColor: theme.buttonTextMedium }]}
                    onPress={() => {
                      handleSizeOfTextChange(SIZES.body2);
                    }}
                  >
                    <Text style={{ ...FONTS.body2, color: COLORS.white }}>
                      Abc
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[styles.button, { backgroundColor: theme.buttonTextLarge }]}
                    onPress={() => {
                      handleSizeOfTextChange(SIZES.body1);
                    }}
                  >
                    <Text style={{ ...FONTS.body1, color: COLORS.white }}>
                      Abc
                    </Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.FontSelector}>
                  <OptionSelector
                    options={options}
                    defaultOptionIndex={options.indexOf(selectedOption)}
                    onOptionSelected={handleOptionSelected}
                  />
                </View>
              </View>
            </View>
          </Modal>
        </GestureRecognizer>

        <Modal
          visible={chapterModalVisible}
          animationType="fade"
          transparent={true}
          onRequestClose={() => setChapterModalVisible(false)}
        >
          <BlurView intensity={10} tint="dark" style={styles.blurContainer}>
            <View style={styles.modalContainer}>
              <View style={styles.modalChapter}>
                <TouchableOpacity
                  style={styles.chapterOption}
                  onPress={() => selectChapter("Chapter1")}
                >
                  <Text style={styles.chapterOptionText}>Chapter 1</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.chapterOption}
                  onPress={() => selectChapter("Chapter2")}
                >
                  <Text style={styles.chapterOptionText}>Chapter 2</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.chapterOption}
                  onPress={() => selectChapter("Chapter3")}
                >
                  <Text style={styles.chapterOptionText}>Chapter 3</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.chapterOption, { borderBottomWidth: 0 }]}
                  onPress={() => setChapterModalVisible(!chapterModalVisible)}
                >
                  <Text style={styles.chapterOptionText}>Cancle</Text>
                </TouchableOpacity>
              </View>
            </View>
          </BlurView>
        </Modal>
      </View>
    );
  }
}
