import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  TouchableOpacity,
} from "react-native";
import React, { useContext } from "react";
import {
  Foundation,
  MaterialIcons,
  FontAwesome,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import { ThemeContext } from "../context/ThemeContextProvider";
import { useMyBooks } from "../context/MyBooksProvider";

import { COLORS, FONTS, SIZES } from "../constants";

type BookItemProps = {
  book: Book;
};

const BookItem = ({ book }: BookItemProps) => {
  const { theme } = useContext(ThemeContext);
  const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      marginBottom: SIZES.padding,
      marginHorizontal: SIZES.padding,
      paddingRight: SIZES.radius,
      backgroundColor: theme.backgroundColor,
      borderRadius: 10,
      shadowColor: theme.gray,
      shadowOffset: {
        width: 5,
        height: 5,
      },
      shadowOpacity: 0.2,
      shadowRadius: 5.62,
      elevation: 7,
    },
    image: {
      flex: 1.5,
      minHeight: 140,
      minWidth: 110,
      aspectRatio: 2 / 3,
      marginRight: 10,
      borderRadius: 10,
    },
    contentContainer: {
      flex: 4,
      paddingLeft: SIZES.padding / 2,
    },
    bookTitle: {
      ...FONTS.h2,
      fontWeight: "600",
      color: theme.textColor,
    },
    bookAuthors: {
      ...FONTS.h3,
      fontWeight: "500",
      color: theme.authorColor,
    },
  });

  const { isBookSaved, onToggleSaved } = useMyBooks();
  const saved = isBookSaved(book);
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("BookDetail", {
            book: book,
          });
        }}
      >
        {book.image ? (
          <Image
            source={{ uri: book.image }}
            resizeMode="cover"
            style={styles.image}
          />
        ) : (
          <View
            style={[
              {
                backgroundColor: theme.backgroundColor,
              },
              styles.image,
            ]}
          />
        )}
      </TouchableOpacity>

      <View style={styles.contentContainer}>
        <Text numberOfLines={1} ellipsizeMode="tail" style={styles.bookTitle}>
          {book.title}
        </Text>
        <Text numberOfLines={2} ellipsizeMode="tail" style={styles.bookAuthors}>
          by {book.authors?.join(", ")}
        </Text>

        <View
          style={{
            flexDirection: "row",
            marginTop: SIZES.radius,
            alignItems: "center",
          }}
        >
          <Foundation name="page-multiple" size={15} color={theme.inforColor} />
          <Text
            style={{
              ...FONTS.body4,
              color: theme.inforColor,
              paddingHorizontal: SIZES.radius,
            }}
          >
            {book.pageNumber ? (
              book.pageNumber
            ) : (
              <MaterialCommunityIcons
                name="null"
                size={15}
                color={theme.inforColor}
              />
            )}
          </Text>

          <MaterialIcons name="star-rate" size={15} color={theme.inforColor} />
          <Text
            style={{
              ...FONTS.body4,
              color: theme.inforColor,
              paddingHorizontal: SIZES.radius,
            }}
          >
            {book.rating ? (
              book.rating
            ) : (
              <MaterialCommunityIcons
                name="null"
                size={15}
                color={theme.inforColor}
              />
            )}
          </Text>
        </View>

        <View style={{ flexDirection: "row", marginTop: SIZES.base }}>
          {book.type && (
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                padding: SIZES.base,
                marginRight: SIZES.base,
                backgroundColor: theme.red,
                height: 40,
                borderRadius: SIZES.radius,
              }}
            >
              <Text style={{ ...FONTS.body3, color: theme.textRed }}>
                {book.type}
              </Text>
            </View>
          )}
        </View>
      </View>

      <Pressable
        onPress={() => onToggleSaved(book)}
        style={{ paddingTop: SIZES.radius / 2, paddingLeft: SIZES.radius / 2 }}
      >
        <FontAwesome
          name="bookmark"
          size={24}
          color={saved ? COLORS.yellow : theme.secondary}
        />
      </Pressable>
    </View>
  );
};

export default BookItem;
