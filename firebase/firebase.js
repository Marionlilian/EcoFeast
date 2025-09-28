import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  getFirestore,
  collection,
  getDoc,
  doc,
  setDoc,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  query,
  where,
  serverTimestamp,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD6w9UXbSwSZ7Aw8ZUhrxt-bHnMu3k2xYE",
  authDomain: "ecofeast-5ff01.firebaseapp.com",
  projectId: "ecofeast-5ff01",
  storageBucket: "ecofeast-5ff01.firebasestorage.app",
  messagingSenderId: "111524926453",
  appId: "1:111524926453:web:cad7d24952f5f4be5a06bc",
  measurementId: "G-RCM88L20YL",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

export const usersCollection = collection(db, "users");
export const donationsCollection = collection(db, "donations");

export const setUserRole = async (userId, role) => {
  await setDoc(doc(db, "users", userId), { role });
};

export const getUserRole = async (userId) => {
  try {
    const userDoc = await getDoc(doc(db, "users", userId));
    return userDoc.exists() ? userDoc.data().role : null;
  } catch (error) {
    alert(error.message);
    return null;
  }
};

export const addDonation = async (donation) => {
  const user = auth.currentUser;
  if (!user) throw new Error("User must be logged in");

  const donationWithMeta = {
    ...donation,
    postedBy: user.uid,
    status: "available",
    timestamp: serverTimestamp(),
  };

  const docRef = await addDoc(donationsCollection, donationWithMeta);
  return docRef.id;
};

export const getDonations = async () => {
  const snapshot = await getDocs(donationsCollection);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const updateDonation = async (id, updatedData) => {
  await updateDoc(doc(db, "donations", id), updatedData);
};

export const deleteDonation = async (id) => {
  await deleteDoc(doc(db, "donations", id));
};

export const getAvailableDonations = async () => {
  const q = query(donationsCollection, where("status", "==", "available"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};
