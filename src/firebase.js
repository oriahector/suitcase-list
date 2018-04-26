import {initializeApp} from 'firebase';

const app = initializeApp({
   apiKey: "AIzaSyBJ0aoJ9epSO0WGUvhPfRVWZ55UEyPPYl0",
    authDomain: "suitcase-101e4.firebaseapp.com",
    databaseURL: "https://suitcase-101e4.firebaseio.com",
    projectId: "suitcase-101e4",
    storageBucket: "suitcase-101e4.appspot.com",
    messagingSenderId: "914756827855"
});

export const db = app.database();
export const suitcasesRef = db.ref('suitcases');
export const itemsRef = db.ref('suitcases/hector/summer/items')

