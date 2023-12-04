import { getUsersFromDb, userLogout, checkRoom, auth } from "/config/firebase.js";
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
        window.location.href = "login.html"; // Redirect to login page
    });

getUsers();
async function getUsers() {
    const users = await getUsersFromDb(); // Retrieve users from the database
    const userList = document.getElementById("users");

    // Display each user's information in the UI
    users.forEach(item => {
      const userListItem = document.createElement('li');
      userListItem.classList.add('list-group-item');
      userList.innerHTML += ` 
      
      <div class="user-info" onclick="initiateChat('${item.userId}')">
      <li class="list-group-item">
      <img class="user-img" src='${item.imageUrl}'> 
      <div class="profile-details">
          <div class="profileListName">${item.fullname}</div>
      </div>
  </div>
 </li> 
      `;
    });
    

    // Function to filter users based on search input
    document.getElementById("searchInput").addEventListener("input", function() {
        const searchValue = this.value.toLowerCase();
        userList.innerHTML = ""; // Clear the list

        // Filter users based on search input
        const filteredUsers = users.filter(user =>
            user.fullname.toLowerCase().includes(searchValue) || user.email.toLowerCase().includes(searchValue)
        );

        // Display filtered users
        filteredUsers.forEach(item => {
            userList.innerHTML += `
            <div class="user-info" onclick="initiateChat('${item.userId}')">
            <li class="list-group-item">
            <img class="user-img" src='${item.imageUrl}'> 
            <div class="profile-details">
                <div class="profileListName">${item.fullname}</div>
            </div>
        </div>
       </li> `;
        });
    });
}
// Function to handle user logout
window.logout = function () {
    userLogout();
    window.location.replace("login.html"); // Redirect to the registration page after logout
}
// Function to initiate a chat with a specific user and redirect to the chat page
window.initiateChat = async function (friendId) {
    const chatRoom = await checkRoom(friendId); // Check if a chat room exists with the friend
    window.location.href = `userList.html?id=${chatRoom.id}`; // Redirect to the chat page with the chat room ID as a query parameter
}



