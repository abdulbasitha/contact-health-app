import firebase from "firebase";
const config = {
    apiKey: "AIzaSyDglYH5J5iBRENR0FxJDF85mVK3_Krr7B8",
    authDomain: "cr-hosp.firebaseapp.com",
    databaseURL: "https://cr-hosp.firebaseio.com",
    projectId: "cr-hosp",
    storageBucket: "cr-hosp.appspot.com",
    messagingSenderId: "411441770173",
    appId: "1:411441770173:web:db015e134b8996163e91d4",
    measurementId: "G-G1TCC409T9"
};
const fire = firebase.initializeApp(config);
export default fire;
