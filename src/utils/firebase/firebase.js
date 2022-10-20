import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDm5mH653M2Qav80nXKQaTQwyDfPhFHp8I",
  authDomain: "crown-clothing-db-c721a.firebaseapp.com",
  projectId: "crown-clothing-db-c721a",
  storageBucket: "crown-clothing-db-c721a.appspot.com",
  messagingSenderId: "817671552551",
  appId: "1:817671552551:web:6bc44fb5295ac3e44dd802",
};

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();

export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const signInUserWithEmailAndPassword = (email, password) =>
  signInWithEmailAndPassword(auth, email, password);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth, additionalInfo) => {
  const userDocRef = await doc(db, "users", userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInfo,
      });
    } catch (error) {
      console.log("Error creating user", error);
    }
  }
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};