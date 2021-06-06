// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from "firebase/app";

// Add the Firebase products that you want to use. In our case, auth and firestore
import "firebase/auth";
import "firebase/firestore";

// Our application's Firebase project configuration object
const config = {
  apiKey: "AIzaSyAdOZjruMaD8fM7svzcDqvleMW7ekG4UI4",
  authDomain: "descient-crwn-db.firebaseapp.com",
  projectId: "descient-crwn-db",
  storageBucket: "descient-crwn-db.appspot.com",
  messagingSenderId: "1047025421602",
  appId: "1:1047025421602:web:9ba709bdc5368dbe89e97b",
};

// Initialize Firebase
firebase.initializeApp(config);

// Get and export the auth and firestore service from the firebase app
export const auth = firebase.auth();
export const firestore = firebase.firestore();

// Handle the sign-in flow with the Firebase SDK
// Create an instance of the Google provider object
const provider = new firebase.auth.GoogleAuthProvider();
// Optionally specify additional custom OAuth provider params to send with the request
provider.setCustomParameters({ prompt: "select_account" });

export const signInWithGoogle = () => auth.signInWithPopup(provider);
export default firebase;
