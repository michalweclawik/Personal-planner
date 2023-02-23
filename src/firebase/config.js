import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCDxzInIhnpiAxC08e5U8KG-EuSNxcSnOg",
  authDomain: "holiday-planner-3cbd5.firebaseapp.com",
  projectId: "holiday-planner-3cbd5",
  storageBucket: "holiday-planner-3cbd5.appspot.com",
  messagingSenderId: "454021425500",
  appId: "1:454021425500:web:163a0798372a43c865b999",
};

// init firebase

initializeApp(firebaseConfig);

// init firestore
const db = getFirestore();

// init firebase auth
const auth = getAuth();

// init firebase storage
const storage = getStorage();

// timestamp

export { db, auth, storage };
