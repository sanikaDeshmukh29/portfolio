import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAQ-ZuB8wh09IlizL_kuAlmkmoMYcfvZ2k",
  authDomain: "portfolio-a2b74.firebaseapp.com",
  projectId: "portfolio-a2b74",
  storageBucket: "portfolio-a2b74.firebasestorage.app",
  messagingSenderId: "931629058952",
  appId: "1:931629058952:web:eb55df5de41aa3631a083d",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);