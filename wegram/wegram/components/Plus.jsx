import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
export default function Plus({ plus }) {
  return (
    <TouchableOpacity onPress={plus}>
      <Text>Plus</Text>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({});
