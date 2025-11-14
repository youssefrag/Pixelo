import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAaGI5D2lvRSBzO_3JcM8xMZFhXDHPMeqI",
  authDomain: "pixelo-aadfb.firebaseapp.com",
  projectId: "pixelo-aadfb",
  storageBucket: "pixelo-aadfb.firebasestorage.app",
  messagingSenderId: "769804491438",
  appId: "1:769804491438:web:8ad4bcc710cfa9b0c06b3f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);
