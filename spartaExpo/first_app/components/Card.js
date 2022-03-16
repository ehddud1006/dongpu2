import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
export default function Card({ content }) {
  return (
    <View style={styles.card}>
      <Image style={styles.card1} source={{ uri: content.image }}></Image>
      <View style={styles.card2}>
        <Text style={styles.header} numberOfLines={1}>
          {content.title}
        </Text>
        <Text style={styles.pp} numberOfLines={3}>
          {content.desc}
        </Text>
        <Text style={styles.date}>{content.date}</Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  card: {
    display: 'flex',
    flexDirection: 'row',
  },
  card1: {
    flex: 2,
    height: 100,
    borderRadius: 10,
    marginTop: 15,
    marginRight: 10,
  },
  card2: {
    flex: 4,
    marginTop: 15,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  date: {
    fontSize: 12,
    color: '#666666',
  },
});
