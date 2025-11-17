import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBh7o896GRwAZh2YoYrTQHVpSwpc0LU6rU",
  authDomain: "todo-app-master-ff749.firebaseapp.com",
  projectId: "todo-app-master-ff749",
  storageBucket: "todo-app-master-ff749.firebasestorage.app",
  messagingSenderId: "984870223694",
  appId: "1:984870223694:web:674a3f6c56901d5664281f",
  measurementId: "G-QTHVE9J4ZX"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);