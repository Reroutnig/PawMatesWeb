import { auth, userLogout, getUsersFromDb } from '/config/firebase.js';

//Function to display the full name of the logged-in user on the profile page
async function displayUserFullName() {
  try {
    auth.onAuthStateChanged(async (currentUser) => {
      if (currentUser) {
        const users = await getUsersFromDb();
        const user = users.find(u => u.userId === currentUser.uid);

        if (user) {
          const userFullName = user.fullname;
          document.getElementById('userFullName').innerText = `${userFullName}'s profile ✮⋆˙`;
        } else {
          document.getElementById('userFullName').innerText = 'User data not found';
        }
      } else {
        document.getElementById('userFullName').innerText = 'No user logged in';
      }
    });
  } catch (error) {
    console.error('Error fetching user data:', error);
    document.getElementById('userFullName').innerText = 'Error fetching user data';
  }
}

//Function to display user bio on the profile page
async function displayUserBio() {
  try {
    auth.onAuthStateChanged(async (currentUser) => {
      if (currentUser) {
        const users = await getUsersFromDb();
        const user = users.find(u => u.userId === currentUser.uid);

        if (user) {
          const userBio = user.bio || 'No bio available';
          const bioElement = document.createElement('p');
          bioElement.textContent = `Bio: ${userBio}`;
          document.body.appendChild(bioElement);
        } else {
          console.log('User data not found');
        }
      } else {
        console.log('No user logged in');
      }
    });
  } catch (error) {
    console.error('Error fetching user data:', error);
  }
}

//Function to display user's availability on the profile page
async function displayUserAvailability() {
  try {
    auth.onAuthStateChanged(async (currentUser) => {
      if (currentUser) {
        const users = await getUsersFromDb();
        const user = users.find(u => u.userId === currentUser.uid);

        if (user && user.availability) {
          const availabilityText = `Availability: ${user.availability.join(', ')}`;
          const availabilityElement = document.createElement('p');
          availabilityElement.textContent = availabilityText;
          document.body.appendChild(availabilityElement);
        } else {
          console.log('User data or availability not found');
        }
      } else {
        console.log('No user logged in');
      }
    });
  } catch (error) {
    console.error('Error fetching user data:', error);
  }
}

//Function to display user's pet type on the profile page
async function displayUserPetType() {
  try {
    auth.onAuthStateChanged(async (currentUser) => {
      if (currentUser) {
        const users = await getUsersFromDb();
        const user = users.find(u => u.userId === currentUser.uid);

        if (user && user.petType) {
          const petTypeElement = document.createElement('p');
          petTypeElement.textContent = `Pet Type: ${user.petType}`;
          document.body.appendChild(petTypeElement);
        } else {
          console.log('User data or pet type not found');
        }
      } else {
        console.log('No user logged in');
      }
    });
  } catch (error) {
    console.error('Error fetching user data:', error);
  }
}

//Function to display user's gender on the profile page
async function displayUserGender() {
  try {
    auth.onAuthStateChanged(async (currentUser) => {
      if (currentUser) {
        const users = await getUsersFromDb();
        const user = users.find(u => u.userId === currentUser.uid);

        if (user && user.gender) {
          const genderElement = document.createElement('p');
          genderElement.textContent = `Gender: ${user.gender}`;
          document.body.appendChild(genderElement);
        } else {
          console.log('User data or gender not found');
        }
      } else {
        console.log('No user logged in');
      }
    });
  } catch (error) {
    console.error('Error fetching user data:', error);
  }
}

//Function to handle user logout
window.logout = function () {
  userLogout();
  window.location.replace("login.html"); //Redirect to the login page after logout
}

//Call the functions to display the user fullname, bio, and availability when the page loads
displayUserFullName();
displayUserBio();
displayUserAvailability();
displayUserPetType();
displayUserGender();