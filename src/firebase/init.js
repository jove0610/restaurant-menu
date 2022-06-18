import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyC4e8ho4QatYWjm7nP8nGOmKdHMT_nd6mU",
  authDomain: "restaurant-menu-2dc09.firebaseapp.com",
  databaseURL: "https://restaurant-menu-2dc09-default-rtdb.firebaseio.com",
  projectId: "restaurant-menu-2dc09",
  storageBucket: "restaurant-menu-2dc09.appspot.com",
  messagingSenderId: "599328563214",
  appId: "1:599328563214:web:b058e7252a29e05ec3dc5f",
  measurementId: "G-19MJPM94NS",
};

const initFireBase = () => initializeApp(firebaseConfig);

export default initFireBase;
