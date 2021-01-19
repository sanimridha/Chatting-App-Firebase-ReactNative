// @refresh reset
import React, { useState, useEffect } from "react";
import asyncStorage from "@react-native-community/async-storage";
import {
  StyleSheet,
  Text,
  View,
  LogBox,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  StatusBar,
} from "react-native";
import * as firebase from "firebase";
import "firebase/firestore";
import AsyncStorage from "@react-native-community/async-storage";

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
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  useEffect(() => {
    readUser();
  }, []);
  const readUser = async () => {
    const user = await AsyncStorage.getItem("user");
    if (user) {
      setUser;
      JSON.parse(user);
    }
  };
  async function handlePress() {
    const _id = Math.random.toString(36).substring(7);
    const user = { _id, name };
    await AsyncStorage.setItem("user", JSON.stringify(user));
    setUser(user);
  }
  if (!user) {
    return (
      <ImageBackground
        style={styles.background}
        source={require("./assets/background.jpg")}
      >
        <View style={styles.container}>
          <TextInput
            style={styles.input}
            placeholder="First Name:"
            value={name}
            onChangeText={setName}
          />
          <TouchableOpacity style={styles.button} onPress={handlePress}>
            <Text style={styles.text}>Enter Chatroom</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    );
  }

  return (
    <View style={styles.container}>
      <Text>We Have Active User To Talk</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: 30,
    paddingBottom: 300,
  },
  input: {
    height: 50,
    width: "100%",
    borderWidth: 2.5,
    padding: 15,
    borderColor: "#ad0000",
    borderRadius: 20,
    borderBottomRightRadius: 1,
    borderTopLeftRadius: 1,
    backgroundColor: "#ffffe3",
  },
  button: {
    backgroundColor: "#ad0000",
    // borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    height: "8%",
    width: "42%",
    marginVertical: 6,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  text: {
    color: "#ffffe3",
    fontSize: 15,
    textTransform: "capitalize",
    fontWeight: "bold",
  },
  background: {
    flex: 1,
    // justifyContent: "flex-end",
    // alignItems: "center",
    position: "relative",
  },
});
