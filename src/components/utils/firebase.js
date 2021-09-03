import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseApp = initializeApp({
  apiKey: "AIzaSyBmSQwpGZs1pbgvwPulCSw7UlTvUXZlR3Q",
  authDomain: "react-todo-8d206.firebaseapp.com",
  databaseURL:
    "https://react-todo-8d206-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "react-todo-8d206",
  storageBucket: "react-todo-8d206.appspot.com",
  messagingSenderId: "147295612453",
  appId: "1:147295612453:web:db08d270cce8d2989bd9cc",
});

export const db = getDatabase(firebaseApp);
