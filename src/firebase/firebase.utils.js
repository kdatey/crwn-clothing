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

/**
 * Checks and creates a new user profile in the database.
 * @param {*} userAuth user auth object
 * @param {*} additionalData object containing additional data to add to the profile
 * @returns firestore user document reference. Void if user auth doesn't exist
 */
export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  // get the document reference and generate the snapshot.
  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapshot = await userRef.get();

  // if exists of the snapshot returns false, profile does not exist; create new.
  if (!snapshot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({ displayName, email, createdAt, ...additionalData });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
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
