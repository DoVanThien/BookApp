import {
  ActivityIndicator,
  Button,
  FlatList,
  TextInput,
  TouchableOpacity,
  Image,
  SafeAreaView,
  StatusBar,
} from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
import { IconButton } from "@react-native-material/core";
import { AntDesign, Entypo, FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";

import { Text, View } from "../../components/Themed";
import { useLazyQuery } from "@apollo/client";
import BookItem from "../../components/BookItem";
import React, { useState } from "react";
import { searchQuery } from "./queries";
import { parseBook } from "../../services/BookService";
import styles from "./styles";
import { COLORS, FONTS, Icons, SIZES } from "../../constants";

export default function SearchScreen({ navigation }: { navigation: any }) {
  const [search, setSearch] = useState("");
  const [input, setInput] = useState(false);
  const [provider, setProvider] = useState<BookProvider>("googleBooksSearch");

  const [runQuery, { data, loading, error }] = useLazyQuery(searchQuery);
  const [profile, setProfile] = useState("Do Thien");

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
                {profile}
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
            onPress={() => navigation.navigate('Modal')}
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
          </View>

          {loading && <ActivityIndicator />}
          {error && (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <FontAwesome5 name="sad-cry" size={100} color="white" />
              <Text style={{ ...FONTS.h2, color: COLORS.white, paddingTop: SIZES.padding }}>
                Can't find this book
              </Text>
              
            </View>
          )}

          <View style={{ marginHorizontal: SIZES.padding, flex: 1 }}>
            <FlatList
              data={
                (provider === "googleBooksSearch"
                  ? data?.googleBooksSearch?.items
                  : data?.openLibrarySearch?.docs) || []
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
    </SafeAreaView>
  );
}
