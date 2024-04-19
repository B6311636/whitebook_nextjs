// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyALMRCaMZNkTkle7Eoky1yY_0lqaJS36_k",
    authDomain: "whitebook-411409.firebaseapp.com",
    projectId: "whitebook-411409",
    storageBucket: "whitebook-411409.appspot.com",
    messagingSenderId: "25111726438",
    appId: "1:25111726438:web:63098359ba11e8d55d60a7",
    measurementId: "G-F4317EMNLY"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
// const analytics = getAnalytics(firebaseApp);

export default firebaseApp