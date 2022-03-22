import {StatusBar} from "expo-status-bar";
import {StyleSheet, Text, View} from "react-native";
import React, {useState} from "react";
import {WebView} from "react-native-webview";
import MyWeb from "./components/MyWeb";

export default function App() {
  return <MyWeb></MyWeb>;
  // return (
  //   <WebView
  //     source={{
  //       uri: "https://m.blog.naver.com/PostList.nhn?blogId=rlaalsdn456456",
  //     }}
  //   />
  // );
}
