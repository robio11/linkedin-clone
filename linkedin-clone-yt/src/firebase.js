import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth,GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCCi1IvGyOxOsv2-T9MyiThnWW4mfIRS4s",
  authDomain: "linkedin-clone-c7509.firebaseapp.com",
  databaseURL: "https://linkedin-clone-c7509-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "linkedin-clone-c7509",
  storageBucket: "linkedin-clone-c7509.appspot.com",
  messagingSenderId: "721930168231",
  appId: "1:721930168231:web:048041a8023d39ea157882"
};

const app = initializeApp(firebaseConfig)

export const db = getFirestore(app);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });