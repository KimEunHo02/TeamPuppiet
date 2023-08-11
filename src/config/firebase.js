// firebase 연동 - 정희석
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "@firebase/firestore"
// SDK 설정 - 정희석
const firebaseConfig = {
  apiKey: "AIzaSyC6Tx6JUBz4zqGNIBG-P_4ovjG29vt8Io0",
  authDomain: "puppiet.firebaseapp.com",
  projectId: "puppiet",
  storageBucket: "puppiet.appspot.com",
  messagingSenderId: "6767777206",
  appId: "1:6767777206:web:335d5cb3896564ccc35d17",
  measurementId: "G-WJF95GGBHF"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);
const analytics = getAnalytics(firebaseApp);

// 꼭 이렇게 해야하는 건 아니니까 편한대로 해당 스크립트에서 import해서 사용해도 된다 - 정희석
export { firebaseAuth , createUserWithEmailAndPassword, signInWithEmailAndPassword };
export default firebaseApp;
export const db = getFirestore(firebaseApp);