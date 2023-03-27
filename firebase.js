
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCM1mAfZmqm38YuTnhBIJUjktYr3j7yQG4",
  authDomain: "e-commerce-56a9d.firebaseapp.com",
  projectId: "e-commerce-56a9d",
  storageBucket: "e-commerce-56a9d.appspot.com",
  messagingSenderId: "1008039594585",
  appId: "1:1008039594585:web:ff16942420e1e4fc1aff48"
};


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);