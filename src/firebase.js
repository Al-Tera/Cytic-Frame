import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyAxSuIN-YS-rncm8QMMCIuGkM6hcFdAMYw",
  authDomain: "cytus-prototype.firebaseapp.com",
  databaseURL: "https://cytus-prototype.firebaseio.com",
  projectId: "cytus-prototype",
  storageBucket: "cytus-prototype.appspot.com",
  messagingSenderId: "174786323024",
  appId: "1:174786323024:web:1e5ecb29d2537fbb57a755",
  measurementId: "G-VWCW9D1WDK"
})

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export {db, auth, storage};