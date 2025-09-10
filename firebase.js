// Import the functions you need from the SDKs you need
import { initializeApp} from "firebase/app";
import { getAuth } from "firebase/auth";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD6w9UXbSwSZ7Aw8ZUhrxt-bHnMu3k2xYE",
  authDomain: "ecofeast-5ff01.firebaseapp.com",
  projectId: "ecofeast-5ff01",
  storageBucket: "ecofeast-5ff01.firebasestorage.app",
  messagingSenderId: "111524926453",
  appId: "1:111524926453:web:cad7d24952f5f4be5a06bc",
  measurementId: "G-RCM88L20YL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth =getAuth(app);
// const analytics = getAnalytics(app);