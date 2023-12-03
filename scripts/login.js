import {checkUser,signInFirebase} from '/config/firebase.js'
 
// Check if a user is already logged in when the window loads
checkUser();

window.login = async function(){
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    try{
        //document.getElementsByClassName("btn-outline-dark")[0].style.display = "none"  
        //document.getElementsByClassName("btn-outline-dark")[1].style.display = "inline-block"  
        await signInFirebase(email,password);
    } catch (e){
        switch (e.code){
              // If user is not found
            case 'auth/user-not-found':
            // document.getElementsByClassName("btn-outline-dark")[0].style.display = "inline-block"  
            // document.getElementsByClassName("btn-outline-dark")[1].style.display = "none" 
            document.getElementsByClassName("error")[0].innerText = "User Not Found"
            break;
            // If wrong password is entered
            case 'auth/wrong-password':
                // document.getElementsByClassName("btn-outline-dark")[0].style.display = "inline-block"  
                // document.getElementsByClassName("btn-outline-dark")[1].style.display = "none" 
                document.getElementsByClassName("error")[0].innerText = "Invalid password"
                break;
            case 'auth/invalid-login-credentials':
              document.getElementsByClassName("error")[0].innerText = "Invalid Login Credentials"
              break;
            default:
            //default case for other errors
                //document.getElementsByClassName("btn-outline-dark")[0].style.display = "inline-block"  
                //document.getElementsByClassName("btn-outline-dark")[1].style.display = "none" 
                document.getElementsByClassName("error")[0].innerText = "Error"
        }
        // Revert the button text to 'LOGIN' in case of an error
    button.innerHTML = 'LOGIN';
    }
}

const signupButton = document.getElementById('signupButton');
const forgotPassButton = document.getElementById('forgotPassButton');

signupButton.addEventListener('click', function() {
  window.location.href = 'register.html';
});

forgotPassButton.addEventListener('click', function() {
  window.location.href = 'passwordRecovery.html';
});


