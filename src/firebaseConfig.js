import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { initializeApp } from "firebase/app";


const firebaseConfig = {
  apiKey: "AIzaSyCKbZhVtt8KHNlxknNjmtr_HqU6Cq2wuBU",
  authDomain: "candycrush-saga-2.firebaseapp.com",
  projectId: "candycrush-saga-2",
  storageBucket: "candycrush-saga-2.appspot.com",
  messagingSenderId: "230162124374",
  appId: "1:230162124374:web:f86c0da59d55b08fe6b5f7",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

