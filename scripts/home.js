//import functions from firebase.js
import { checkLoggedInUser} from "/config/firebase.js";
// Check if the user is logged in before allowing access to the page
checkLoggedInUser()
    .then((user) => {
        // User is logged in, allow access to the page
        console.log("User is logged in");
        // Add your logic for allowing access here
    })
    .catch(() => {
        // User is not logged in, redirect to the login page
        console.log("User is not logged in, redirecting to login page");
        window.location.href = "login.html"; // Redirect to login page
    });
