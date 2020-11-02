import 'firebase/auth';

import * as firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID
};

// Check if we have already initialized an app
const firebaseApp = !firebase.apps.length
    ? firebase.initializeApp(firebaseConfig)
    : firebase.app();

export const firebaseAppAuth = firebaseApp.auth();
export const db = firebaseApp.firestore();
export const store = firebaseApp.storage();

export const providers = {
    googleProvider: new firebase.auth.GoogleAuthProvider(),
    githubProvider: new firebase.auth.GithubAuthProvider() // <- This one is optional
};
