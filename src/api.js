import firebase from "firebase/app";
import "firebase/fibase-auth";
import "firebase/fibase-firestore";

import { firebaseConfig } from "./firebaseConfig";

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();

export default{
    googleLogar: async ()=>{
        const provider = new firebase.auth.GoogleAuthProvider();
        let result = awaitfirebase.auth().signWithPopup(provider);
        return result;
    }
}