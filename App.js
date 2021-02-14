// @refresh reset
import React, { useState, useEffect, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  LogBox,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Platform,
} from "react-native";
import * as firebase from "firebase";

// import { firebase } from "./node_modules/firebase/firebase";
import "firebase/firestore";
import AsyncStorage from "@react-native-community/async-storage";
import { GiftedChat } from "react-native-gifted-chat";
// import fb from "firebase/app";
const firebaseConfig = {
  //your Firebase Config
};

if (Platform.OS === "android" || Platform.OS === "ios") {
  if (firebase.app.length === 0) {
    firebase.initializeApp(firebaseConfig);
  }
} else {
  firebase.initializeApp(firebaseConfig);
}
if (Platform.OS === "android" || Platform.OS === "ios") {
  LogBox.ignoreLogs(["Setting a timer for a long period of time"]);
}
// Initialize Firebase
// fb.initializeApp(firebaseConfig);

// if (fb.app.length === 0) {
//   fb.initializeApp(firebaseConfig);
// }

// LogBox.ignoreAllLogs(["Setting a timer for a long period of time"]);

// export const firebase = !fb.app.length
//   ? fb.initializeApp(firebaseConfig)
//   : fb.app();

const db = firebase.firestore();
const chatRef = db.collection("chats");

export default function App() {
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    readUser();
    const unsubscribe = chatRef.onSnapshot(querySnapshot => {
      const messagesFirestore = querySnapshot
        .docChanges()
        .filter(({ type }) => type === "added")
        .map(({ doc }) => {
          const message = doc.data();
          //createdAt is firebase.firestore.Timestamp instance
          //https://firebase.google.com/docs/reference/js/firebase.firestore.Timestamp
          return { ...message, createdAt: message.createdAt.toDate() };
        })
        .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
      appendMessages(messagesFirestore);
    });
    return () => unsubscribe();
  }, []);
  const appendMessages = useCallback(
    messages => {
      setMessages(previousMessages =>
        GiftedChat.append(previousMessages, messages)
      );
    },
    [messages]
  );
  const readUser = async () => {
    const user = await AsyncStorage.getItem("user");
    if (user) {
      setUser(JSON.parse(user));
    }
  };
  async function handlePress() {
    const _id = Math.random.toString(36).substring(7);
    const user = { _id, name };
    await AsyncStorage.setItem("user", JSON.stringify(user));
    setUser(user);
  }
  async function handleSend(messages) {
    const writes = messages.map(m => chatRef.add(m));
    await Promise.all(writes);
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

  return <GiftedChat messages={messages} user={user} onSend={handleSend} />;
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

///https://github.com/vercel/next.js/discussions/11351
