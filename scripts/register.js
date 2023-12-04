import {addUserToDb, checkUser,signUpFirebase, checkLoggedInUser,uploadImage} from "/config/firebase.js"
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

window.signup = async function (){
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const fullname = document.getElementById("fullname").value;
    const profile = document.getElementById("image").files[0];
    const allowedDomains = ["@gmail.com", "@yahoo.com", "@outlook.com"]; // Define allowed domains
    // Check if email contains an allowed domain
    const isValidDomain = allowedDomains.some(domain => email.includes(domain));
    const emailField = document.getElementById("email");
    const emailError = document.getElementById("emailError")
    //checks for valid username
    const isValidUsername = /[a-zA-Z].*[a-zA-Z]/.test(fullname);
    const usernameField = document.getElementById("fullname");
    const usernameError = document.getElementById("usernameError");
      // Check if the password meets the criteria
    const isValidPassword = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/.test(password);
    const passwordField = document.getElementById("password");
    const passwordError = document.getElementById("passwordError");
     
   
    if (!isValidPassword) {
        // If the password is invalid, show an error message
        passwordField.classList.add("is-invalid");
        passwordError.style.display = "block";
        return;
    }

    // If the password is valid, remove error message and styling
    passwordField.classList.remove("is-invalid");
    passwordError.style.display = "none";


    if (!isValidUsername) {
        // If the username doesn't contain at least 2 letters, show an error message
        usernameField.classList.add("is-invalid");
        usernameError.style.display = "block";
        return;
    }

    // If the username is valid, remove error message and styling
    usernameField.classList.remove("is-invalid");
    usernameError.style.display = "none";
    
    if (!isValidDomain) {
        // If the domain is not valid, show an error message
        document.getElementById("email").classList.add("is-invalid");
        return;
    }
    // Check if any input field is empty or profile image is not uploaded
    if(email == "" || password == "" || fullname == "" || profile == undefined){
        alert("All the inputs required");
        return;
    }
    try{
        document.getElementsByClassName("btn-outline-dark")[0].style.display = "none"  
        document.getElementsByClassName("btn-outline-dark")[1].style.display = "inline-block"  
        await signUpFirebase({email,password}); 
        // Upload profile image and retrieve its URL  
        const imageUrl = await uploadImage(profile);
        await addUserToDb({email,fullname,imageUrl})
        // Check if the user is successfully signed up
        checkUser()
    }catch (e){
        switch (e.code){
            // If email is already in use
            case 'auth/email-already-in-use':
                document.getElementsByClassName("btn-outline-dark")[0].style.display = "inline-block"  
                document.getElementsByClassName("btn-outline-dark")[1].style.display = "none" 
                document.getElementById("error").innerText = "Email already registered"
                break;
            // If the password is weak
            case  'auth/weak-password':
                document.getElementsByClassName("btn-outline-dark")[0].style.display = "inline-block"  
                document.getElementsByClassName("btn-outline-dark")[1].style.display = "none" 
                document.getElementById("error").innerText = "Weak password"
                break;
            // Default case for other errors
            default :
            document.getElementsByClassName("btn-outline-dark")[0].style.display = "inline-block"  
            document.getElementsByClassName("btn-outline-dark")[1].style.display = "none" 
            document.getElementById("error").innerText = "Error: Please enter valid inputs."
            
        }
        console.log(e.code)
    }
}


