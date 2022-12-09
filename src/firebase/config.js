import Firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyCLd5r8YVDcYjS4JwxwX6zUwoQggmd0Rsg",
    authDomain: "snake-game-df973.firebaseapp.com",
    projectId: "snake-game-df973",
    storageBucket: "snake-game-df973.appspot.com",
    messagingSenderId: "991421738428",
    appId: "1:991421738428:web:c6044978940055763acfb9",
    measurementId: "G-Q20DXN3T8S"
  };

export const firebase = Firebase.initializeApp(firebaseConfig)