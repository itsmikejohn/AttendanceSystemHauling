
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyAeANLBVVa2T4PJA2Q9U49_vTK9RiptPwY",
  authDomain: "attendancesystem-70549.firebaseapp.com",
  projectId: "attendancesystem-70549",
  storageBucket: "attendancesystem-70549.appspot.com",
  messagingSenderId: "496996270629",
  appId: "1:496996270629:web:0b6e7eeba17cff92cf75cc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);


import { writable } from "svelte/store";

export const adminState = writable({
    /**Create Subject States */
    showCreateSubject: false,
    crtSbjComparison: 0.1,
    attendedStudents:<any[]> [],
    pendingStudents:<any[]> [],

});

export const studentState = writable({

})

export const staticState = writable({
    activeItem: "",
    defaultNav: ["Relax, everything will be ok."],
    adminNav: ["Create Subject", "Pending Students"],
    studentNav: ["Subjects"],
    hasAuth: false,
    hasAdmin: false,
    hasUser: false,

    showRegister: false,
    showReset: false,

})

export const adminKeyProvider = writable(["2DCCKaA50zfU0SjKVxCov9DQlsM2"]);



