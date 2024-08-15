import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBngVkycBB7HkMPpje-9P6Z261Ti2UG7a4",
  authDomain: "socialmedia-5a9a9.firebaseapp.com",
  projectId: "socialmedia-5a9a9",
  storageBucket: "socialmedia-5a9a9.appspot.com",
  messagingSenderId: "606258110653",
  appId: "1:606258110653:web:2032ce9122ae0dc27f97d4",
  measurementId: "G-425ZFJGXDL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const imageDb= getStorage(app) ;
export default app ;