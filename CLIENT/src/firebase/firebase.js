import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCv3ZIHh-mEEMy7H5ClIaKgQM_Uydhks58",
  authDomain: "stock-manager-e6893.firebaseapp.com",
  projectId: "stock-manager-e6893",
  storageBucket: "stock-manager-e6893.appspot.com",
  messagingSenderId: "178426257069",
  appId: "1:178426257069:web:fea01694606706923af024",
  measurementId: "G-547T208LX5"
};


const app = initializeApp(firebaseConfig);

const auth = getAuth(app)
export { app, auth };