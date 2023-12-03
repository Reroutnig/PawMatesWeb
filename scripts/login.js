import { checkUser, signInFirebase } from '/config/firebase.js';

// Check if a user is already logged in when the window loads
checkUser();

window.login = async function() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  try {
    const button = document.getElementById('button');
    // Display the three-dot loading animation on button click
    button.innerHTML = '<div class="three-dots"><span class="dot"></span><span class="dot"></span><span class="dot"></span></div>';

    await signInFirebase(email, password);
    // Perform login process

    // On successful login, you can navigate to a different page or handle it accordingly
  } catch (e) {
    switch (e.code) {
      // Handle error cases
      case 'auth/user-not-found':
        break;
      case 'auth/wrong-password':
        break;
      default:
      // Default case for other errors
    }
    // Revert the button text to 'LOGIN' in case of an error
    button.innerHTML = 'LOGIN';
  }
};

const signupButton = document.getElementById('signupButton');
const forgotPassButton = document.getElementById('forgotPassButton');

signupButton.addEventListener('click', function() {
  window.location.href = 'register.html';
});

forgotPassButton.addEventListener('click', function() {
  window.location.href = 'passwordRecovery.html';
});