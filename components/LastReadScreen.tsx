import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import BookItem from './BookItem';

interface Props {
    lastReadBooks: Book[];
  }

  const LastReadScreen: React.FC<Props> = ({ lastReadBooks }) => {
    return (
      <View style={styles.container}>
        <FlatList
          data={lastReadBooks}
          renderItem={({ item }) => <BookItem book={item} />}
        //   keyExtractor={(item) => item.id}
        />
      </View>
    );
  };
  export default LastReadScreen;
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 10,
    },
  });
  
  