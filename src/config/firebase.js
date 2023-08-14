// firebase 연동 - 정희석
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "@firebase/firestore";

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
const firebaseAuth = getAuth(firebaseApp);  // auth 객체 가져오기
const analytics = getAnalytics(firebaseApp);


// 어딘가에서 로그인 상태 변화를 감지하고 로그인 상태에 따라 다른 동작 수행
onAuthStateChanged(firebaseAuth, (user) => {
  if (user) {
    // 로그인 상태일 때
    console.log("사용자가 로그인되었습니다.", user);
    // 필요한 로직을 추가하거나 렌더링을 업데이트할 수 있습니다.
  } else {
    // 로그아웃 상태일 때
    console.log("사용자가 로그아웃되었습니다.");
    // 필요한 로직을 추가하거나 렌더링을 업데이트할 수 있습니다.
  }
});


// 꼭 이렇게 해야하는 건 아니니까 편한대로 해당 스크립트에서 import해서 사용해도 된다 - 정희석
export { firebaseAuth , createUserWithEmailAndPassword, signInWithEmailAndPassword };
export const db = getFirestore(firebaseApp);

export default firebaseApp;