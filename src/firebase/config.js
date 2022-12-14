import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCLd5r8YVDcYjS4JwxwX6zUwoQggmd0Rsg",
  authDomain: "snake-game-df973.firebaseapp.com",
  databaseURL: "https://snake-game-df973-default-rtdb.firebaseio.com",
  projectId: "snake-game-df973",
  storageBucket: "snake-game-df973.appspot.com",
  messagingSenderId: "991421738428",
  appId: "1:991421738428:web:c6044978940055763acfb9",
  measurementId: "G-Q20DXN3T8S",
};
const app = initializeApp(firebaseConfig);
export const db  = getDatabase(app);