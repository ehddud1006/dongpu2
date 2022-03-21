import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
export default function LikeLoading() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>찜한 목록이 없어요 ㅠㅠ.</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    //앱의 배경 색
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fdc453',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
  },
});
