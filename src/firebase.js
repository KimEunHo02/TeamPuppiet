// firebase 연동 -- 정희석
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: "puppiet.firebaseapp.com",
  projectId: "puppiet",
  storageBucket: "puppiet.appspot.com",
  messagingSenderId: "6767777206",
  appId: "1:6767777206:web:335d5cb3896564ccc35d17",
  measurementId: "G-WJF95GGBHF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth()
export const analytics = getAnalytics(app);