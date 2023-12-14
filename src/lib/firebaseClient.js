import { getApps, initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyAwiQMFqJQb-n8sJcepJupA2EUqT7Y-AeQ",
    authDomain: "entertainment-web-app-62cb7.firebaseapp.com",
    projectId: "entertainment-web-app-62cb7",
    storageBucket: "entertainment-web-app-62cb7.appspot.com",
    messagingSenderId: "709135409883",
    appId: "1:709135409883:web:dcec0f56f4c5882bb662fe",
    measurementId: "G-5VKZ9R9Q3E"
};

const app = !getApps().length 
   ? initializeApp(firebaseConfig) 
   : getApps()[0];

const firestore = getFirestore(app);
const auth = getAuth(app); 

export { firestore, auth };
