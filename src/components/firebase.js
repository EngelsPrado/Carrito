import firebase from "firebase/app";
import React from 'react'
import "firebase/firestore"; // NEW
import "firebase/auth";
import "firebase/storage";
import {Redirect} from '@reach/router'
const config = {
    apiKey: "AIzaSyA8iodjNHv3v9P6ENy9BqzL3aRywmDouwM",
    authDomain: "breath-70f2b.firebaseapp.com",
    databaseURL: "https://breath-70f2b.firebaseio.com",
    projectId: "breath-70f2b",
    storageBucket: "breath-70f2b.appspot.com",
    messagingSenderId: "982260944321",
    appId: "1:982260944321:web:7445e0764d82eb07f73340",
    measurementId: "G-FPZQ9B5MQF"
};

firebase.initializeApp(config);
export const storage = firebase.storage();
export const firestore = firebase.firestore(); // NEW
export const auth = firebase.auth();
export const provider = new firebase.auth.GoogleAuthProvider();
export const fbprovider = new firebase.auth.FacebookAuthProvider();
export const signInWithGoogle = () => auth.signInWithPopup(provider).then(ini=>{ console.log(ini) });
export const signInWithFacebook = () => auth.signInWithPopup(fbprovider);
export const signOut = () => auth.signOut();


export const createUserDocument = async (user, additionalData) => {
    // If there is no user, let's not do this.
    if (!user) return;
  
    // Get a reference to the location in the Firestore where the user
    // document may or may not exist.
    const userRef = firestore.doc(`users/${user.uid}`);
  
    // Go and fetch a document from that location.
    const snapshot = await userRef.get();
  
    // If there isn't a document for that user. Let's use information
    // that we got from either Google or our sign up form.
    if (!snapshot.exists) {
      console.log(user);
      const { displayName, email, photoURL } = user;
      const createdAt = new Date();
      try {
        await userRef.set({
          displayName,
          email,
          photoURL,
          createdAt,
          ...additionalData
        });
      } catch (error) {
        console.error("Error creating user", console.error);
      }
    }
  
    // Get the document and return it, since that's what we're
    // likely to want to do next.
    return getUserDocument(user.uid);
  };
  
  export const getUserDocument = async uid => {
    if (!uid) return null;
    try {
      return firestore.collection("users").doc(uid);
    } catch (error) {
      console.error("Error fetching user", error.message);
    }
  };
  export default firebase;