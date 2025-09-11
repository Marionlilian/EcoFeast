import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { collection,getDoc,doc, getFirestore, setDoc, addDoc, getDocs, updateDoc, deleteDoc } from "firebase/firestore";
const firebaseConfig = {
    
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,



  };
  const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);export const usersCollection = collection(db, "users");
export const coursesCollection = collection(db, "courses");export const setUserRole = async(userId, role)=>{
    setDoc(doc(db, "users", userId), {role});
};
export const getUserRole = async(userId)=>{
    try{
        const userDoc = await getDoc(doc(db, "users", userId));
        return userDoc.exists()? userDoc.data().role : null;
    }catch(error){
        alert(error.message)
    }
};export const addCourse = (course)=>{
    addDoc(coursesCollection, course);
}
export const getCourses = async()=>{
    const snapshot = await getDocs(coursesCollection);
    return snapshot.docs.map(doc=>({id:doc.id,...doc.data()}));
};export const updateCourse = (id, course)=>{
    updateDoc(doc(db, "courses", id), course);
}
export const deleteCourse = (id)=>{
    deleteDoc(doc(db, "courses", id));
}
