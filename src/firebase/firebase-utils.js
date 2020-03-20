import firebase from "firebase/app";
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyBmE4zzcIpw9bNoV4v1tjU0DIqgskuG7lM",
  authDomain: "clothstore-3c6ba.firebaseapp.com",
  databaseURL: "https://clothstore-3c6ba.firebaseio.com",
  projectId: "clothstore-3c6ba",
  storageBucket: "clothstore-3c6ba.appspot.com",
  messagingSenderId: "340290797751",
  appId: "1:340290797751:web:9785fd2a950b737f7f4d32",
  measurementId: "G-K9HX6N2S8M"
};

firebase.initializeApp(config);


// export firebase objects
export const auth = firebase.auth();
export const firestore = firebase.firestore();


// google authentication
const provider = new firebase.auth.GoogleAuthProvider();

// config for the provider
// enable pop-up to select email account
provider.setCustomParameters({
  prompt: 'select_account'
});

// export sign-in with google method
export const signInWithGoogle = () => auth.signInWithPopup(provider);

// export firebase too
export default firebase;


/**
 * User document creation in firestore
 * Creates or returns User from firestore
 * @param userAuth
 * @param additionalData
 * @returns {Promise<firebase.firestore.DocumentReference<firebase.firestore.DocumentData>>}
 */
export const createUserProfileDocument = async (userAuth, additionalData) => {

  if (!userAuth) return;

  // document (REFERENCE) doesn't contains actual data
  // document Reference is used to perform CRUD methods
  const userRef = firestore.doc(`users/${userAuth.uid}`);

  // is actual data
  const userSnapshot = await userRef.get();
  // console.log('ref',userRef, 'snapshot',userSnapshot);

  // checking if data exists in ref using snapshot
  if (!userSnapshot.exists) {
    // auth vars
    const {displayName, email} = userAuth;

    const createdAt = new Date();

    // save to fireStore
    try {

      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });

    } catch (e) {
      console.log(e.message());
    }
  }

  return userRef;
};
