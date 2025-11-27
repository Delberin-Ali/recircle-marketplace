import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Your Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAncL5qe7YIKCJx4cquzJwX5dP4Jheg5Sk",
    authDomain: "recircle-marketplace.firebaseapp.com",
    projectId: "recircle-marketplace",
    storageBucket: "recircle-marketplace.firebasestorage.app",
    messagingSenderId: "316489856576",
    appId: "1:316489856576:web:03bd9672eeb2486b7211a5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore (database)
export const db = getFirestore(app);

// Initialize Storage (for images)
export const storage = getStorage(app);