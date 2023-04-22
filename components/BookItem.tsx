import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useMyBooks } from "../context/MyBooksProvider";
import { Foundation, MaterialIcons, FontAwesome } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';


import Colors from "../constants/Colors";
import { COLORS, FONTS, SIZES } from "../constants";

type BookItemProps = {
  book: Book;
};

const BookItem = (
  { book }: BookItemProps,
) => {
  const { isBookSaved, onToggleSaved } = useMyBooks();
  const saved = isBookSaved(book);
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity
      onPress={() => {
        navigation.navigate('BookDetail', {
          book: book
        });
      }}
      >
        <Image
          source={{ uri: book.image }}
          resizeMode="cover"
          style={styles.image}
        />
      </TouchableOpacity>

      <View style={styles.contentContainer}>
        <Text numberOfLines={1} ellipsizeMode="tail" style={styles.bookTitle}>
          {book.title}
        </Text>
        <Text style={styles.bookAuthors}>by {book.authors?.join(", ")}</Text>

        <View
          style={{
            flexDirection: "row",
            marginTop: SIZES.radius,
            alignItems: "center",
          }}
        >
          <Foundation
            name="page-multiple"
            size={15}
            color={COLORS.lightGray2}
          />
          <Text
            style={{
              ...FONTS.body4,
              color: COLORS.lightGray2,
              paddingHorizontal: SIZES.radius,
            }}
          >
            {book.pageNumber}
          </Text>

          <MaterialIcons name="star-rate" size={15} color={COLORS.lightGray2} />
          <Text
            style={{
              ...FONTS.body4,
              color: COLORS.lightGray2,
              paddingHorizontal: SIZES.radius,
            }}
          >
            {book.rating}
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
                backgroundColor: COLORS.darkRed,
                height: 40,
                borderRadius: SIZES.radius,
              }}
            >
              <Text style={{ ...FONTS.body3, color: COLORS.lightRed }}>
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
          color={saved ? COLORS.yellow : COLORS.white}
        />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginVertical: 10,
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
    color: COLORS.white,
  },
  bookAuthors: {
    ...FONTS.h3,
    fontWeight: "500",
    color: COLORS.lightGray4,
  },
  button: {
    backgroundColor: Colors.light.tint,
    alignSelf: "flex-start",
    marginTop: "auto",
    marginVertical: 10,
    padding: 7,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontWeight: "600",
  },
});

export default BookItem;
