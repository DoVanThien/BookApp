import {
  ActivityIndicator,
  FlatList,
  TextInput,
  TouchableOpacity,
  Image,
  SafeAreaView,
  StatusBar,
  Modal,
  StyleSheet,
} from "react-native";
import { IconButton } from "@react-native-material/core";
import {
  Ionicons,
  FontAwesome5,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

import { Text, View } from "../../components/Themed";
import { useLazyQuery } from "@apollo/client";
import BookItem from "../../components/BookItem";
import React, { useEffect, useState, useContext } from "react";
import { searchQuery } from "./queries";
import { parseBook } from "../../services/BookService";
import { COLORS, FONTS, Icons, SIZES, lightTheme } from "../../constants";
import GestureRecognizer from "react-native-swipe-gestures";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ToggleButton from "../../components/ToggleButton";
import { ThemeContext } from "../../context/ThemeContextProvider";

export default function SearchScreen({ navigation }: { navigation: any }) {
  const { theme } = useContext(ThemeContext);
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.backgroundColor,
    },
    headerContainer: {
      height: 200,
      backgroundColor: theme.backgroundColor,
      paddingHorizontal: SIZES.padding,
    },
    header: {
      flex: 1,
      flexDirection: "row",
      paddingTop: SIZES.padding,
      alignItems: "center",
      backgroundColor: theme.backgroundColor,
    },
    fieldInput: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: SIZES.radius,
      marginVertical: SIZES.padding,
      backgroundColor: theme.backgroundInputColor,
      borderWidth: 1,
      borderColor: theme.backgroundInputColor,
      borderRadius: 80,
    },
    input: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      paddingLeft: 13,
      backgroundColor: theme.backgroundInputColor,
    },
    boxInput: {
      flex: 1,
      color: theme.textColor,
      fontSize: 18,
    },
    tabs: {
      flexDirection: "row",
      justifyContent: "space-around",
      alignItems: "center",
      marginHorizontal: SIZES.padding,
      paddingVertical: SIZES.padding / 2,
      marginBottom: SIZES.padding / 2, 
      backgroundColor: theme.backgroundColor,
    },
    buttonTabs1: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      padding: SIZES.base,
      marginRight: SIZES.base,
      backgroundColor: theme.primary,
      height: 40,
      borderRadius: SIZES.radius,
    },
    buttonTabs2: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      padding: SIZES.base,
      marginRight: SIZES.base,
      backgroundColor: theme.secondary,
      height: 40,
      borderRadius: SIZES.radius,
    },
    textTabs1: {
      fontWeight: "700",
      color: COLORS.white,
    },
    textTabs2: {
      fontWeight: "700",
      color: theme.gray,
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
      backgroundColor: theme.backgroundColor,
    },
    modalView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: theme.backgroundModal,
      borderRadius: 20,
      padding: SIZES.padding,
      paddingTop: SIZES.padding2,
    },
    textFilter: {
      fontSize: 23,
      fontWeight: "800",
      lineHeight: 40,
      color: theme.textColor,
    },
  });

  const [search, setSearch] = useState("");
  const [input, setInput] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [provider, setProvider] = useState<BookProvider>("googleBooksSearch");

  const [runQuery, { data, loading, error }] = useLazyQuery(searchQuery);

  const [sortBy, setSortBy] = useState("");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [reloadTime, setReloadTime] = useState(0);

  useEffect(() => {
    async function getData() {
      try {
        const firstNameValue = await AsyncStorage.getItem("userFirstName");
        const lastNameValue = await AsyncStorage.getItem("userLastName");

        if (firstNameValue !== null) {
          setFirstName(firstNameValue);
        }

        if (lastNameValue !== null) {
          setLastName(lastNameValue);
        }
      } catch (e) {
        console.log(e);
      }
    }

    getData();
    const intervalId = setInterval(() => {
      setReloadTime(Date.now());
    }, 1000);

    return () => clearInterval(intervalId);
  }, [reloadTime]);

  function sortAscendingBooksByTitle(books: any) {
    if (!books) {
      return [];
    }
    if (provider == "googleBooksSearch") {
      return [...books].sort((a, b) => {
        if (a?.volumeInfo?.title < b?.volumeInfo?.title) {
          return -1;
        } else if (a?.volumeInfo?.title > b?.volumeInfo?.title) {
          return 1;
        } else {
          return 0;
        }
      });
    } else {
      return [...books].sort((a, b) => {
        if (a?.title < b?.title) {
          return -1;
        } else if (a?.title > b?.title) {
          return 1;
        } else {
          return 0;
        }
      });
    }
  }

  function sortDescendingBooksByTitle(books: any) {
    if (!books) {
      return [];
    }
    if (provider == "googleBooksSearch") {
      return [...books].sort((a, b) => {
        if (a?.volumeInfo?.title < b?.volumeInfo?.title) {
          return 1;
        } else if (a?.volumeInfo?.title > b?.volumeInfo?.title) {
          return -1;
        } else {
          return 0;
        }
      });
    } else {
      return [...books].sort((a, b) => {
        if (a?.title < b?.title) {
          return 1;
        } else if (a?.title > b?.title) {
          return -1;
        } else {
          return 0;
        }
      });
    }
  }

  function sortAscendingBooksByRating(books: any) {
    if (!books) {
      return [];
    }
    if (provider == "googleBooksSearch") {
      return [...books].sort((a, b) => {
        if (!a?.volumeInfo?.averageRating) {
          return 1;
        }
        if (!b?.volumeInfo?.averageRating) {
          return -1;
        }
        return a.volumeInfo.averageRating - b.volumeInfo.averageRating;
      });
    } else {
      return [...books].sort((a, b) => {
        if (!a?.edition_count) {
          return 1;
        }
        if (!b?.edition_count) {
          return -1;
        }
        return a.edition_count - b.edition_count;
      });
    }
  }

  function sortDescendingBooksByRating(books: any) {
    if (!books) {
      return [];
    }
    if (provider == "googleBooksSearch") {
      return [...books].sort((a, b) => {
        if (!a?.volumeInfo?.averageRating) {
          return 1;
        }
        if (!b?.volumeInfo?.averageRating) {
          return -1;
        }
        return b.volumeInfo.averageRating - a.volumeInfo.averageRating;
      });
    } else {
      return [...books].sort((a, b) => {
        if (!a?.edition_count) {
          return 1;
        }
        if (!b?.edition_count) {
          return -1;
        }
        return b.edition_count - a.edition_count;
      });
    }
  }

  function sortAscendingBooksByPageCount(books: any) {
    if (!books) {
      return [];
    }
    if (provider == "googleBooksSearch") {
      return [...books].sort((a, b) => {
        if (!a.volumeInfo.pageCount) {
          return 1;
        } else if (!b.volumeInfo.pageCount) {
          return -1;
        } else {
          return a.volumeInfo.pageCount - b.volumeInfo.pageCount;
        }
      });
    } else {
      return [...books].sort((a, b) => {
        if (!a.number_of_pages_median) {
          return 1;
        } else if (!b.number_of_pages_median) {
          return -1;
        } else {
          return a.number_of_pages_median - b.number_of_pages_median;
        }
      });
    }
  }

  function sortDescendingBooksByPageCount(books: any) {
    if (!books) {
      return [];
    }
    if (provider == "googleBooksSearch") {
      return [...books].sort((a, b) => {
        if (!a.volumeInfo.pageCount) {
          return 1;
        } else if (!b.volumeInfo.pageCount) {
          return -1;
        } else {
          return b.volumeInfo.pageCount - a.volumeInfo.pageCount;
        }
      });
    } else {
      return [...books].sort((a, b) => {
        if (!a.number_of_pages_median) {
          return 1;
        } else if (!b.number_of_pages_median) {
          return -1;
        } else {
          return b.number_of_pages_median - a.number_of_pages_median;
        }
      });
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle={theme === lightTheme ? "dark-content" : "light-content"}
      />
      <View style={styles.headerContainer}>
        <View style={styles.header}>
          <View style={{ flex: 1, backgroundColor: theme.backgroundColor }}>
            <View
              style={{
                marginRight: SIZES.padding,
                backgroundColor: theme.backgroundColor,
              }}
            >
              <Text style={{ ...FONTS.h3, color: theme.textColor }}>
                Good Morning
              </Text>
              <Text style={{ ...FONTS.h1, color: theme.textColor }}>
                {firstName} {lastName}
              </Text>
            </View>
          </View>
          <ToggleButton />
          <TouchableOpacity
            style={{
              height: 60,
              width: 60,
              paddingLeft: 3,
              paddingRight: SIZES.radius,
            }}
            onPress={() => navigation.navigate("Modal")}
          >
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <View style={{ backgroundColor: theme.backgroundColor }}>
                <Image
                  source={Icons.image}
                  resizeMode="cover"
                  style={{
                    width: 55,
                    height: 55,
                    borderRadius: 22,
                  }}
                />
              </View>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.fieldInput}>
          <View style={styles.input}>
            <TextInput
              value={search}
              onChangeText={setSearch}
              placeholder="Search a book or author"
              placeholderTextColor={theme.gray}
              style={styles.boxInput}
            />
            {search !== "" && (
              <TouchableOpacity
                onPress={() => {
                  setInput(!input);
                  setSearch("");
                }}
              >
                <MaterialCommunityIcons
                  name="close-thick"
                  size={15}
                  color={theme.gray}
                />
              </TouchableOpacity>
            )}
          </View>

          <IconButton
            icon={
              <MaterialCommunityIcons
                name="magnify"
                size={35}
                color={theme.gray}
              />
            }
            onPress={() => {
              runQuery({ variables: { q: search } });
              setInput(true);
            }}
          />
        </View>
      </View>

      {/* body */}
      <View>{!input && <></>}</View>

      {input && (
        <>
          <View style={styles.tabs}>
            <TouchableOpacity
              style={
                provider === "googleBooksSearch"
                  ? styles.buttonTabs1
                  : styles.buttonTabs2
              }
              onPress={() => setProvider("googleBooksSearch")}
            >
              <Text
                style={
                  provider === "googleBooksSearch"
                    ? styles.textTabs1
                    : styles.textTabs2
                }
              >
                Google Book
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={
                provider === "openLibrarySearch"
                  ? styles.buttonTabs1
                  : styles.buttonTabs2
              }
              onPress={() => setProvider("openLibrarySearch")}
            >
              <Text
                style={
                  provider === "openLibrarySearch"
                    ? styles.textTabs1
                    : styles.textTabs2
                }
              >
                Open Library
              </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <Ionicons
                style={{ paddingLeft: SIZES.radius / 2 }}
                name="filter"
                size={30}
                color={theme.gray}
              />
            </TouchableOpacity>
          </View>

          {loading && <ActivityIndicator />}
          {error && (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: theme.backgroundColor,
              }}
            >
              <FontAwesome5 name="sad-cry" size={100} color={theme.textColor} />
              <Text
                style={{
                  ...FONTS.h2,
                  color: theme.textColor,
                  paddingTop: SIZES.padding,
                }}
              >
                Can't find this book
              </Text>
            </View>
          )}

          <View style={{ flex: 1, backgroundColor: theme.backgroundColor }}>
            <FlatList
              data={
                sortBy === "titleA-Z"
                  ? sortAscendingBooksByTitle(
                      provider === "googleBooksSearch"
                        ? data?.googleBooksSearch?.items
                        : data?.openLibrarySearch?.docs
                    )
                  : sortBy === "titleZ-A"
                  ? sortDescendingBooksByTitle(
                      provider === "googleBooksSearch"
                        ? data?.googleBooksSearch?.items
                        : data?.openLibrarySearch?.docs
                    )
                  : sortBy === "AscendingRating"
                  ? sortAscendingBooksByRating(
                      provider === "googleBooksSearch"
                        ? data?.googleBooksSearch?.items
                        : data?.openLibrarySearch?.docs
                    )
                  : sortBy === "DescendingRating"
                  ? sortDescendingBooksByRating(
                      provider === "googleBooksSearch"
                        ? data?.googleBooksSearch?.items
                        : data?.openLibrarySearch?.docs
                    )
                  : sortBy === "AscendingPageNumber"
                  ? sortAscendingBooksByPageCount(
                      provider === "googleBooksSearch"
                        ? data?.googleBooksSearch?.items
                        : data?.openLibrarySearch?.docs
                    )
                  : sortBy === "DescendingPageNumber"
                  ? sortDescendingBooksByPageCount(
                      provider === "googleBooksSearch"
                        ? data?.googleBooksSearch?.items
                        : data?.openLibrarySearch?.docs
                    )
                  : provider === "googleBooksSearch"
                  ? data?.googleBooksSearch?.items
                  : data?.openLibrarySearch?.docs || []
              }
              showsVerticalScrollIndicator={false}
              bounces={false}
              renderItem={({ item }) => (
                <BookItem book={parseBook(item, provider)} />
              )}
            />
          </View>
        </>
      )}

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
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => {
                  setSortBy("titleA-Z");
                  setModalVisible(false);
                }}
              >
                <Text style={styles.textFilter}>Sort by Title A-{">"}Z</Text>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => {
                  setSortBy("titleZ-A");
                  setModalVisible(false);
                }}
              >
                <Text style={styles.textFilter}>Sort by Title Z-{">"}A</Text>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => {
                  setSortBy("AscendingRating");
                  setModalVisible(false);
                }}
              >
                <Text style={styles.textFilter}>Sort by Ascending Rating</Text>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => {
                  setSortBy("DescendingRating");
                  setModalVisible(false);
                }}
              >
                <Text style={styles.textFilter}>Sort by Descending Rating</Text>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => {
                  setSortBy("AscendingPageNumber");
                  setModalVisible(false);
                }}
              >
                <Text style={styles.textFilter}>
                  Sort by Ascending Page Number
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => {
                  setSortBy("DescendingPageNumber");
                  setModalVisible(false);
                }}
              >
                <Text style={styles.textFilter}>
                  Sort by Descending Page Number
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.textFilter}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </GestureRecognizer>
    </SafeAreaView>
  );
}
