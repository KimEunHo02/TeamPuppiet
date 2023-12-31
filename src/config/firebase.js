// firebase 연동 - 정희석
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, updateDoc, doc, addDoc, collection, getDocs } from "@firebase/firestore";

import * as firebase from 'firebase/app';
import 'firebase/auth';

import "firebase/firestore"
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
const firebaseApp = initializeApp(firebaseConfig);  // firebase 초기화
const auth = getAuth(firebaseApp);  // auth 객체 가져오기
const analytics = getAnalytics(firebaseApp);
const db = getFirestore(firebaseApp);
const firestore = getFirestore(firebaseApp);

// 어딘가에서 로그인 상태 변화를 감지하고 로그인 상태에 따라 다른 동작 수행
onAuthStateChanged(auth,  async (user) => {
  if (user) {
    // 로그인 상태일 때
    console.log("사용자가 로그인되었습니다.", user);
     // 사용자별 스탬프 컬렉션 참조
     const userStampsCollection = collection(db, "userstamp", user.uid, "stamps");

     // 스탬프 데이터 가져오기
     const stampsSnapshot = await getDocs(userStampsCollection);
     const userStamps = stampsSnapshot.docs.map((doc) => doc.data());
 
   } else {
     // 로그아웃 상태일 때
     console.log("사용자가 로그아웃되었습니다.");
     // 필요한 로직을 추가하거나 렌더링을 업데이트할 수 있습니다.
   }
 });
 

// 중복 확인 함수
export const checkDuplicateEmail = async (email) => {
  try {
    const userRef = db.collection('users').where('email', '==', email);
    const querySnapshot = await userRef.get();
    return !querySnapshot.empty;
  } catch (error) {
    console.error('이메일 중복 확인 실패:', error);
    return false;
  }
};

// 꼭 이렇게 해야하는 건 아니니까 편한대로 해당 스크립트에서 import해서 사용해도 된다 - 정희석
export { auth , db, firebaseApp, firebase, createUserWithEmailAndPassword, signInWithEmailAndPassword, firestore,
   firebaseConfig, getFirestore, updateDoc, doc, addDoc, collection // 추가 (유정)
};

export default firebaseApp;