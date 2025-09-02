import { initializeApp } from "firebase/app"
import {getAuth, GoogleAuthProvider} from "firebase/auth"


const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "loginonecart-c9f71.firebaseapp.com",
  projectId: "loginonecart-c9f71",
  storageBucket: "loginonecart-c9f71.firebasestorage.app",
  messagingSenderId: "542299394525",
  appId: "1:542299394525:web:8640c0f3e348571d686634"
}


const app = initializeApp(firebaseConfig)

const auth= getAuth(app)
const provider = new GoogleAuthProvider()


export {auth,provider}