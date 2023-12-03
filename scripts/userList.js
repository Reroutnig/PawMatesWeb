import { getUsersFromDb, userLogout, checkRoom, auth } from "/config/firebase.js";

// Function to fetch users from the database and display them in the UI
getUsers();
async function getUsers() {
    const users = await getUsersFromDb(); // Retrieve users from the database
    for (let item of users) {
        // Display each user's information in the UI
        document.getElementById("users").innerHTML += `
            <li class="list-group-item d-flex justify-content-between align-items-start text-light bg-dark">
                <img class="user-img bg-light" src='${item.imageUrl}'> 
                <div class="ms-2 me-auto">
                    <div class="fw-bold">${item.fullname}</div>
                    ${item.email}
                </div>
                <span class="badge bg-primary rounded-pill">
                    <button style="border:none;background:transparent;color:white" onclick="initiateChat('${item.userId}')">chat</button>
                </span>
            </li>`;
    }
}

// Function to initiate a chat with a specific user and redirect to the chat page
window.initiateChat = async function (friendId) {
    const chatRoom = await checkRoom(friendId); // Check if a chat room exists with the friend
    window.location.href = `chat.html?id=${chatRoom.id}`; // Redirect to the chat page with the chat room ID as a query parameter
}

// Function to handle user logout
window.logout = function () {
    userLogout();
    window.location.replace("login.html"); // Redirect to the registration page after logout
}

