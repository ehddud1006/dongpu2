import React, {useRef} from "react";
import {ActivityIndicator, View} from "react-native";
import {WebView} from "react-native-webview";

export default ({navigation}) => {
  return (
    <WebView
      source={{url: "https://www.google.com/search?q=react+native+school"}}
      startInLoadingState
      renderLoading={() => (
        <View style={{flex: 1, alignItems: "center"}}>
          <ActivityIndicator size="large" />
        </View>
      )}
      allowsBackForwardNavigationGestures
    />
  );
};
