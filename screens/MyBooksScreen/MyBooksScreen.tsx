import React, { useContext } from "react";
import { SafeAreaView, Text, FlatList, StyleSheet } from "react-native";
import BookItem from "../../components/BookItem";
import { View } from "../../components/Themed";
import { SIZES, FONTS } from "../../constants";

import { useMyBooks } from "../../context/MyBooksProvider";
import { ThemeContext } from "../../context/ThemeContextProvider";

export default function MyBooksScreen() {
  const { theme } = useContext(ThemeContext);
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.backgroundColor,
    },
    header: {
      paddingTop: SIZES.padding,
      paddingHorizontal: SIZES.padding,
      backgroundColor: theme.backgroundColor,
    },
    headerText: {
      ...FONTS.h2,
      color: theme.textColor,
      fontWeight: "700",
    },
    books: {
      flex: 1,
      paddingTop: SIZES.padding,
      backgroundColor: theme.backgroundColor,
    },
  });

  const { savedBooks } = useMyBooks();
  console.log(savedBooks);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>My Book</Text>
      </View>
      <View style={styles.books}>
        <FlatList
          data={savedBooks}
          bounces={false}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => <BookItem book={item} />}
        />
      </View>
    </SafeAreaView>
  );
}
