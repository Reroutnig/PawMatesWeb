import { auth, userLogout, getUsersFromDb } from '/config/firebase.js';
//import functions from firebase.js
import { checkLoggedInUser} from "/config/firebase.js";

// Check if the user is logged in before allowing access to the page
checkLoggedInUser()
    .then((user) => {
        // User is logged in, allow access to the page
        console.log("User is logged in");
    })
    .catch(() => {
        // User is not logged in, redirect to the login page
        console.log("User is not logged in, redirecting to login page");
        window.location.href = "/index.html"; // Redirect to login page
    });

//Function to display the full name of the logged-in user on the profile page
async function displayUserFullName() {
  try {
    auth.onAuthStateChanged(async (currentUser) => {
      if (currentUser) {
        const users = await getUsersFromDb();
        const user = users.find(u => u.userId === currentUser.uid);

        if (user) {
          const userFullName = user.fullname;
          document.getElementById('userFullName').innerText = `${userFullName} ✮⋆˙`;
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

//Function to display user's uploaded photos on the profile page
async function displayUserPhotos() {
  try {
    auth.onAuthStateChanged(async (currentUser) => {
      if (currentUser) {
        const users = await getUsersFromDb();
        const user = users.find(u => u.userId === currentUser.uid);

        if (user && user.images && user.images.length > 0) {
          const imagesContainer = document.querySelector('.images-container');

          user.images.forEach(imageUrl => {
            const imgElement = document.createElement('img');
            imgElement.src = imageUrl;
            imgElement.classList.add('user-photo'); // Optionally, add a class for styling
            imagesContainer.appendChild(imgElement);
          });
        } else {
          console.log('User has no uploaded images');
        }
      } else {
        console.log('No user logged in');
      }
    });
  } catch (error) {
    console.error('Error fetching user images:', error);
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
          const bioElement = document.getElementById('userBio');
          bioElement.textContent = `Bio: ${userBio}`;
          bioElement.classList.add('bio-details');
        } else {
          console.log('User data not found');
        }
      } else {
        console.log('No user logged in');
      }
    });
  } catch (error) {
    console.error('Error fetching user data:', error);
    const bioElement = document.getElementById('userBio');
    bioElement.textContent = 'Error fetching user data';
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
          const availabilityElement = document.getElementById('userAvailability');
          availabilityElement.textContent = availabilityText;
          availabilityElement.classList.add('avail-details');
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

//Function to display pet type on the profile page
async function displayUserPetType() {
  try {
    auth.onAuthStateChanged(async (currentUser) => {
      if (currentUser) {
        const users = await getUsersFromDb();
        const user = users.find(u => u.userId === currentUser.uid);

        const petTypeElement = document.getElementById('petType');
        petTypeElement.textContent = user && user.petType ? `Pet Type: ${user.petType}` : 'Pet Type: Not available';
        petTypeElement.classList.add('pet-type-details');
      } else {
        console.log('No user logged in');
      }
    });
  } catch (error) {
    console.error('Error fetching user data:', error);
  }
}

//Function to display gender on the profile page
async function displayUserGender() {
  try {
    auth.onAuthStateChanged(async (currentUser) => {
      if (currentUser) {
        const users = await getUsersFromDb();
        const user = users.find(u => u.userId === currentUser.uid);

        const genderElement = document.getElementById('petGender');
        genderElement.textContent = user && user.gender ? `Gender: ${user.gender}` : 'Gender: Not available';
        genderElement.classList.add('gender-details');
      } else {
        console.log('No user logged in');
      }
    });
  } catch (error) {
    console.error('Error fetching user data:', error);
  }
}

//Function to display pet's age on the profile page
async function displayUserAge() {
  try {
    auth.onAuthStateChanged(async (currentUser) => {
      if (currentUser) {
        const users = await getUsersFromDb();
        const user = users.find(u => u.userId === currentUser.uid);

        const ageElement = document.getElementById('petAge');
        ageElement.textContent = user && user.age ? `Age: ${user.age}` : 'Age: Not available';
        ageElement.classList.add('age-details');
      } else {
        console.log('No user logged in');
      }
    });
  } catch (error) {
    console.error('Error fetching user data:', error);
  }
}

//Function to display pet's size on the profile page
async function displayUserSize() {
  try {
    auth.onAuthStateChanged(async (currentUser) => {
      if (currentUser) {
        const users = await getUsersFromDb();
        const user = users.find(u => u.userId === currentUser.uid);

        const sizeElement = document.getElementById('petSize');
        sizeElement.textContent = user && user.size ? `Size: ${user.size}` : 'Size: Not available';
        sizeElement.classList.add('size-details');
      } else {
        console.log('No user logged in');
      }
    });
  } catch (error) {
    console.error('Error fetching user data:', error);
  }
}

//Function to display pet's vaccination status on the profile page
async function displayUserVaccinationStatus() {
  try {
    auth.onAuthStateChanged(async (currentUser) => {
      if (currentUser) {
        const users = await getUsersFromDb();
        const user = users.find(u => u.userId === currentUser.uid);

        const vaccStatusElement = document.getElementById('petVacc');
        vaccStatusElement.textContent = user && user.vaccinated ? `Vaccinated: ${user.vaccinated}` : 'Vaccinated: Not available';
        vaccStatusElement.classList.add('vacc-details');
      } else {
        console.log('No user logged in');
      }
    });
  } catch (error) {
    console.error('Error fetching user data:', error);
  }
}

//Function to display pet's neutered/spayed status on the profile page
async function displayUserNeuteredSpayedStatus() {
  try {
    auth.onAuthStateChanged(async (currentUser) => {
      if (currentUser) {
        const users = await getUsersFromDb();
        const user = users.find(u => u.userId === currentUser.uid);

        const neuSpaStatusElement = document.getElementById('petNeuSpay');
        neuSpaStatusElement.textContent = user && user.neuteredSpayed ? `Neutered/Spayed: ${user.neuteredSpayed}` : 'Neutered/Spayed: Not available';
        neuSpaStatusElement.classList.add('neuSpay-details');
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
  window.location.replace("/index.html"); //Redirect to the login page after logout
}

//Call the functions to display the user fullname, photos, bio, availability, etc. when the page loads
displayUserFullName();
displayUserPhotos();
displayUserBio();
displayUserAvailability();
displayUserPetType();
displayUserGender();
displayUserAge();
displayUserSize();
displayUserVaccinationStatus();
displayUserNeuteredSpayedStatus();