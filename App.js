// @refresh reset
import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, LogBox } from "react-native";
import * as firebase from "firebase";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAz8UmSjeW_bU94TnjAhQT9vntw7JhVg20",
  authDomain: "chatting-app-f2c95.firebaseapp.com",
  projectId: "chatting-app-f2c95",
  storageBucket: "chatting-app-f2c95.appspot.com",
  messagingSenderId: "1030070017535",
  appId: "1:1030070017535:web:d0bad52c7212aa6932dbca",
};
if (firebase.app.length === 0) {
  firebase.initializeApp(firebaseConfig);
}
LogBox.ignoreAllLogs(["Setting a timer for a long period of time"]);

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
