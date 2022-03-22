import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
export default function Minus({ minus }) {
  return (
    <TouchableOpacity onPress={() => minus()}>
      <Text>Minus</Text>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({});
