import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDFLoIpHfiVJDT6X0lfLkjANMoncHwLXPo",
  authDomain: "lalita-bhakti-studio.firebaseapp.com",
  projectId: "lalita-bhakti-studio",
  storageBucket: "lalita-bhakti-studio.appspot.com",
  messagingSenderId: "314080639188",
  appId: "1:314080639188:web:6bc46bc49e3496c659a341",
  databaseURL: "https://lalita-bhakti-studio-default-rtdb.firebaseio.com"
};


// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);
const storage = getStorage(app);

export { app, auth, db, storage };
