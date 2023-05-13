import {
  ActivityIndicator,
  Button,
  FlatList,
  TextInput,
  TouchableOpacity,
  Image,
  SafeAreaView,
  StatusBar,
  Modal,
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
import React, { useEffect, useState } from "react";
import { searchQuery } from "./queries";
import { parseBook } from "../../services/BookService";
import styles from "./styles";
import { COLORS, FONTS, Icons, SIZES } from "../../constants";
import GestureRecognizer from "react-native-swipe-gestures";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SearchScreen({ navigation }: { navigation: any }) {
  const [search, setSearch] = useState("");
  const [input, setInput] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [provider, setProvider] = useState<BookProvider>("googleBooksSearch");

  const [runQuery, { data, loading, error }] = useLazyQuery(searchQuery);

  const [sortBy, setSortBy] = useState("");

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [reloadTime, setReloadTime] = useState(0);

  useEffect(() => {
    async function getData() {
      try {
        const firstNameValue = await AsyncStorage.getItem('userFirstName');
        const lastNameValue = await AsyncStorage.getItem('userLastName');

        if (firstNameValue !== null) {
          setFirstName(firstNameValue);
        }

        if (lastNameValue !== null) {
          setLastName(lastNameValue);
        }
      } catch (e) {
        console.log(e)
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
      <StatusBar barStyle="light-content" />
      <View style={styles.header}>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            paddingHorizontal: SIZES.padding,
            paddingTop: SIZES.padding / 2,
            alignItems: "center",
          }}
        >
          <View style={{ flex: 1 }}>
            <View style={{ marginRight: SIZES.padding }}>
              <Text style={{ ...FONTS.h3, color: COLORS.white }}>
                Good Morning
              </Text>
              <Text style={{ ...FONTS.h2, color: COLORS.white }}>
              {firstName} {lastName}
              </Text>
            </View>
          </View>

          <TouchableOpacity
            style={{
              height: 50,
              width: 50,
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
              <View>
                <Image
                  source={Icons.image}
                  resizeMode="cover"
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 20,
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
              placeholder="Search"
              placeholderTextColor={"white"}
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
                  color={"white"}
                />
              </TouchableOpacity>
            )}
          </View>

          <IconButton
            icon={
              <MaterialCommunityIcons
                name="magnify"
                size={35}
                color={"white"}
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
            <View
              style={
                provider === "googleBooksSearch"
                  ? styles.buttonTabs1
                  : styles.buttonTabs2
              }
            >
              <Text
                style={
                  provider === "googleBooksSearch"
                    ? styles.textTabs1
                    : styles.textTabs2
                }
                onPress={() => setProvider("googleBooksSearch")}
              >
                Google Book
              </Text>
            </View>

            <View
              style={
                provider === "openLibrarySearch"
                  ? styles.buttonTabs1
                  : styles.buttonTabs2
              }
            >
              <Text
                style={
                  provider === "openLibrarySearch"
                    ? styles.textTabs1
                    : styles.textTabs2
                }
                onPress={() => setProvider("openLibrarySearch")}
              >
                Open Library
              </Text>
            </View>

            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <Ionicons
                style={{ paddingLeft: SIZES.radius / 2 }}
                name="filter"
                size={30}
                color="white"
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
              }}
            >
              <FontAwesome5 name="sad-cry" size={100} color="white" />
              <Text
                style={{
                  ...FONTS.h2,
                  color: COLORS.white,
                  paddingTop: SIZES.padding,
                }}
              >
                Can't find this book
              </Text>
            </View>
          )}

          <View style={{ marginHorizontal: SIZES.padding, flex: 1 }}>
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
