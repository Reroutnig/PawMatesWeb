import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithEmailAndPassword, onAuthStateChanged} from 'https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js'

const firebaseConfig = {
    apiKey: "AIzaSyCE4N3-_icVHFbWLWI9rqO_E-uXwqB67rk",
    authDomain: "pawmates-a1757.firebaseapp.com",
    databaseURL: "https://pawmates-a1757-default-rtdb.firebaseio.com",
    projectId: "pawmates-a1757",
    storageBucket: "pawmates-a1757.appspot.com",
    messagingSenderId: "212632097126",
    appId: "1:212632097126:web:bb4518a57e31549c2178a7"
  };
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

let submit_data = document.getElementById("submit-data");
let forgetEmail = document.querySelector(".forgetEmail");

submit_data.addEventListener("click", async () => {
    try {
        await sendPasswordResetEmail(auth, forgetEmail.value);
        forgetEmail.value = ""; // Clear the email input field after successful submission
        alert("Email Sent! Please check your email for password reset instructions.");
    } catch (error) {
        const errorMessage = error.message;
        console.error("Password reset error:", error);
        alert("Error: " + errorMessage);
    }
});
