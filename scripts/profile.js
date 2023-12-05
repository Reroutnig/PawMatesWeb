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
                  const imagesContainer = document.createElement('div');
                  imagesContainer.classList.add('images-container');

                  user.images.forEach(imageUrl => {
                      const imgElement = document.createElement('img');
                      imgElement.src = imageUrl;
                      imagesContainer.appendChild(imgElement);
                  });

                  document.body.appendChild(imagesContainer);
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
          const bioElement = document.createElement('p');
          bioElement.textContent = `Bio: ${userBio}`;
          bioElement.style.fontFamily = "Bebas Neue";
          bioElement.style.fontSize = '25px';
          bioElement.style.backgroundColor = '#68902B';
          bioElement.style.color = 'white';
          bioElement.style.padding = '10px';
          bioElement.style.borderRadius = '10px';
          bioElement.style.display = 'inline-block';
          document.body.appendChild(bioElement);

          const spacerElement = document.createElement('div');
          spacerElement.style.height = '20px';
          document.body.appendChild(spacerElement);
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
          const availabilityElement = document.createElement('p');
          availabilityElement.textContent = availabilityText;
          availabilityElement.style.fontFamily = "Bebas Neue";
          availabilityElement.style.fontSize = '25px';
          availabilityElement.style.backgroundColor = '#68902B';
          availabilityElement.style.color = 'white';
          availabilityElement.style.padding = '10px';
          availabilityElement.style.borderRadius = '10px';
          availabilityElement.style.display = 'inline-block';
          document.body.appendChild(availabilityElement);

          const spacerElement = document.createElement('div');
          spacerElement.style.height = '20px';
          document.body.appendChild(spacerElement);
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

        const petTypeElement = document.createElement('p');
        petTypeElement.textContent = user && user.petType ? `Pet Type: ${user.petType}` : 'Pet Type: Not available';
        petTypeElement.style.fontFamily = "Bebas Neue";
        petTypeElement.style.fontSize = '25px';
        petTypeElement.style.backgroundColor = '#68902B';
        petTypeElement.style.color = 'white';
        petTypeElement.style.padding = '10px';
        petTypeElement.style.borderRadius = '10px';
        petTypeElement.style.display = 'inline-block';
        document.body.appendChild(petTypeElement);

        const spacerElement = document.createElement('div');
        spacerElement.style.height = '20px';
        document.body.appendChild(spacerElement);
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

        const genderElement = document.createElement('p');
        genderElement.textContent = user && user.gender ? `Gender: ${user.gender}` : 'Gender: Not available';
        genderElement.style.fontFamily = "Bebas Neue";
        genderElement.style.fontSize = '25px';
        genderElement.style.backgroundColor = '#68902B';
        genderElement.style.color = 'white';
        genderElement.style.padding = '10px';
        genderElement.style.borderRadius = '10px';
        genderElement.style.display = 'inline-block';
        document.body.appendChild(genderElement);

        const spacerElement = document.createElement('div');
        spacerElement.style.height = '20px';
        document.body.appendChild(spacerElement);
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

        const ageElement = document.createElement('p');
        ageElement.textContent = user && user.age ? `Age: ${user.age}` : 'Age: Not available';
        ageElement.style.fontFamily = "Bebas Neue";
        ageElement.style.fontSize = '25px';
        ageElement.style.backgroundColor = '#68902B';
        ageElement.style.color = 'white';
        ageElement.style.padding = '10px';
        ageElement.style.borderRadius = '10px';
        ageElement.style.display = 'inline-block';
        document.body.appendChild(ageElement);

        const spacerElement = document.createElement('div');
        spacerElement.style.height = '20px';
        document.body.appendChild(spacerElement);
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

        const sizeElement = document.createElement('p');
        sizeElement.textContent = user && user.size ? `Size: ${user.size}` : 'Size: Not available';
        sizeElement.style.fontFamily = "Bebas Neue";
        sizeElement.style.fontSize = '25px';
        sizeElement.style.backgroundColor = '#68902B';
        sizeElement.style.color = 'white';
        sizeElement.style.padding = '10px';
        sizeElement.style.borderRadius = '10px';
        sizeElement.style.display = 'inline-block';
        document.body.appendChild(sizeElement);

        const spacerElement = document.createElement('div');
          spacerElement.style.height = '20px';
          document.body.appendChild(spacerElement);
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

        const vaccStatusElement = document.createElement('p');
        vaccStatusElement.textContent = user && user.vaccinated ? `Vaccinated: ${user.vaccinated}` : 'Vaccinated: Not available';
        vaccStatusElement.style.fontFamily = "Bebas Neue";
        vaccStatusElement.style.fontSize = '25px';
        vaccStatusElement.style.backgroundColor = '#68902B';
        vaccStatusElement.style.color = 'white';
        vaccStatusElement.style.padding = '10px';
        vaccStatusElement.style.borderRadius = '10px';
        vaccStatusElement.style.display = 'inline-block';
        document.body.appendChild(vaccStatusElement);

        const spacerElement = document.createElement('div');
          spacerElement.style.height = '20px';
          document.body.appendChild(spacerElement);
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

        const neuSpaStatusElement = document.createElement('p');
        neuSpaStatusElement.textContent = user && user.neuteredSpayed ? `Neutered/Spayed: ${user.neuteredSpayed}` : 'Neutered/Spayed: Not available';
        neuSpaStatusElement.style.fontFamily = "Bebas Neue";
        neuSpaStatusElement.style.fontSize = '25px';
        neuSpaStatusElement.style.backgroundColor = '#68902B';
        neuSpaStatusElement.style.color = 'white';
        neuSpaStatusElement.style.padding = '10px';
        neuSpaStatusElement.style.borderRadius = '10px';
        neuSpaStatusElement.style.display = 'inline-block';
        document.body.appendChild(neuSpaStatusElement);
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