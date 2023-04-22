import React from "react";
import { SafeAreaView, Text } from "react-native";
import { FlatList, StyleSheet } from "react-native";
import BookItem from "../../components/BookItem";
import { View } from "../../components/Themed";

import { useMyBooks } from "../../context/MyBooksProvider";
import styles from "./styles";

export default function MyBooksScreen() {
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
          renderItem={({ item }) => <BookItem book={item} />}
        />
      </View>
    </SafeAreaView>
  );
}
