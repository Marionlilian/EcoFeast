import {
  collection,
  doc,
  updateDoc,
  addDoc,
  query,
  where,
  getDocs,
  deleteDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db, auth } from "./firebase";

export const bookDonation = async (donationId) => {
  const user = auth.currentUser;
  if (!user) throw new Error("User must be logged in");

  const donationRef = doc(db, "donations", donationId);
  

  await updateDoc(donationRef, {
  bookedBy: user.uid,
  bookingDate: serverTimestamp(),
  status: "booked",  
});


  await addDoc(collection(db, "bookings"), {
    donationId,
    ngoId: user.uid,
    bookingDate: serverTimestamp(),
    status: "active",
  });

  return { success: true };
};

export const getNGOBookings = async () => {
  const user = auth.currentUser;
  if (!user) throw new Error("User must be logged in");

  const q = query(collection(db, "donations"), where("bookedBy", "==", user.uid));
  const snapshot = await getDocs(q);

  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const cancelBooking = async (donationId) => {
  const user = auth.currentUser;
  if (!user) throw new Error("User must be logged in");

  const donationRef = doc(db, "donations", donationId);

  await updateDoc(donationRef, {
    bookedBy: null,
    bookingDate: null,
    status: "available",
  });

  const bookingQuery = query(
    collection(db, "bookings"),
    where("donationId", "==", donationId),
    where("ngoId", "==", user.uid)
  );

  const snapshot = await getDocs(bookingQuery);
  for (const docSnap of snapshot.docs) {
    await deleteDoc(docSnap.ref);
  }

  return { success: true };
};

export const getAvailableDonations = async () => {
  const q = query(collection(db, "donations"), where("status", "==", "available"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};


export const sendMessage = async (recipientId, donationId, message) => {
  const user = auth.currentUser;
  if (!user) throw new Error("User must be logged in");

  await addDoc(collection(db, "messages"), {
    senderId: user.uid,
    recipientId,
    donationId,
    message,
    timestamp: serverTimestamp(),
    read: false,
  });

  return { success: true };
};

export const getMessages = async () => {
  const user = auth.currentUser;
  if (!user) throw new Error("User must be logged in");

  const sentQuery = query(collection(db, "messages"), where("senderId", "==", user.uid));
  const receivedQuery = query(collection(db, "messages"), where("recipientId", "==", user.uid));

  const [sentSnap, receivedSnap] = await Promise.all([getDocs(sentQuery), getDocs(receivedQuery)]);

  const messages = [];

  sentSnap.forEach(doc => {
    messages.push({ id: doc.id, type: "sent", ...doc.data() });
  });

  receivedSnap.forEach(doc => {
    messages.push({ id: doc.id, type: "received", ...doc.data() });
  });

  messages.sort((a, b) => {
    const timeA = a.timestamp?.toDate ? a.timestamp.toDate() : new Date(a.timestamp);
    const timeB = b.timestamp?.toDate ? b.timestamp.toDate() : new Date(b.timestamp);
    return timeB - timeA;
  });

  return messages;
};

export const markMessageAsRead = async (messageId) => {
  await updateDoc(doc(db, "messages", messageId), { read: true });
  return { success: true };
};

export const getNGOStats = async () => {
  const user = auth.currentUser;
  if (!user) throw new Error("User must be logged in");

  const q = query(collection(db, "donations"), where("bookedBy", "==", user.uid));
  const snapshot = await getDocs(q);

  const totalBookings = snapshot.size;

  let expiringToday = 0;
  let expiringTomorrow = 0;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  const dayAfterTomorrow = new Date(tomorrow);
  dayAfterTomorrow.setDate(tomorrow.getDate() + 1);

  snapshot.forEach(doc => {
    const donation = doc.data();
    const expiry = donation.bestBefore?.toDate
      ? donation.bestBefore.toDate()
      : new Date(donation.bestBefore);

    if (expiry >= today && expiry < tomorrow) {
      expiringToday++;
    } else if (expiry >= tomorrow && expiry < dayAfterTomorrow) {
      expiringTomorrow++;
    }
  });

  return { totalBookings, expiringToday, expiringTomorrow };
};
