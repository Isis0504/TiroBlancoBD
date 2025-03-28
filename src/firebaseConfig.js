// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";

// Tu configuración de Firebase (cópiala desde Firebase Console)
const firebaseConfig = {
    apiKey: "AIzaSyD0D7rNIlS6btlECw0-Voo0ZwOrvUibjRI",
    authDomain: "tiroblancobd.firebaseapp.com",
    projectId: "tiroblancobd",
    storageBucket: "tiroblancobd.firebasestorage.app",
    messagingSenderId: "689643409130",
    appId: "1:689643409130:web:3380bce7b867a9785f5193",
    measurementId: "G-MLV2Z77MBV"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, collection, addDoc, getDocs };
