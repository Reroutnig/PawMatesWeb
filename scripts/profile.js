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

//Function to display pet type on the profile page
async function displayUserPetType() {
  try {
    auth.onAuthStateChanged(async (currentUser) => {
      if (currentUser) {
        const users = await getUsersFromDb();
        const user = users.find(u => u.userId === currentUser.uid);

        const petTypeElement = document.createElement('p');
        petTypeElement.textContent = user && user.petType ? `Pet Type: ${user.petType}` : 'Pet Type: Not available';
        document.body.appendChild(petTypeElement);
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
        document.body.appendChild(genderElement);
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
        document.body.appendChild(ageElement);
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
        document.body.appendChild(sizeElement);
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
        document.body.appendChild(vaccStatusElement);
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
  window.location.replace("login.html"); //Redirect to the login page after logout
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