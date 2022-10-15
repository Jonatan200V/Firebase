// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  getBytes,
} from "firebase/storage";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  getDoc,
  query,
  where,
  setDoc,
  deleteDoc,
} from "firebase/firestore";
// Your web app's Firebase configuration
const {
  REACT_APP_API_KEY,
  REACT_APP_AUT_DOMAIN,
  REACT_APP_PROJECT_ID,
  REACT_APP_STORAGE,
  REACT_APP_MESSAGE_ID,
  REACT_APP_APP_ID,
} = process.env;
const firebaseConfig = {
  apiKey: REACT_APP_API_KEY,
  authDomain: REACT_APP_AUT_DOMAIN,
  projectId: REACT_APP_PROJECT_ID,
  storageBucket: REACT_APP_STORAGE,
  messagingSenderId: REACT_APP_MESSAGE_ID,
  appId: REACT_APP_APP_ID,
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
const userExists = async (uid) => {
  const docRef = doc(db, "users", uid);
  const res = await getDoc(docRef);
  console.log(res);
  return res.exists();
};
const existsUsername = async (username) => {
  const users = [];
  const docRef = collection(db, "users");
  const q = query(docRef, where("username", "==", username));
  const querySpanShot = await getDocs(q);
  querySpanShot.forEach((doc) => {
    users.push(doc.data());
  });
  return users.length > 0 ? users[0].uid : null;
};

export { userExists, existsUsername };
