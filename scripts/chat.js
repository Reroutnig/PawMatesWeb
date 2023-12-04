//import functions from firebase.js
import { sendMessageToDb,getMessagesFromDb,auth,getUsersFromDb} from "/config/firebase.js";


//gets room ID
getRoom();
var myroomId;
function getRoom(){
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    console.log(id); //logs the id
    myroomId = id //store the id in a variable

   
}




var input = document.getElementById("message");
// Execute a function when the user presses a key on the keyboard
input.addEventListener("keypress", function(event) {
    // If the user presses the "Enter" key on the keyboard
    if (event.key === "Enter") {
      // Cancel the default action, if needed
      event.preventDefault();
      // Trigger the button element with a click
      document.getElementById("submit").click();
    }
  });

//sends a message when the submit button is clicked
window.sendMessage = function(){
    let text = document.getElementById("message");
    if(text.value == ""){
        return; //if the message input is empty return nothing
    }
    else{
        sendMessageToDb(text.value,myroomId);
        // clear the message input after seding
        text.value = ""
    }
}

async function getMessages() {
    // Get messages from the database based on the current room ID
    getMessagesFromDb(myroomId, async (messages) => {
         // Get the current scroll position
        const chatArea = document.querySelector('.messageBox');
        const currentScrollPos = chatArea.scrollTop;
        const messageEle = document.getElementById("messages");
        messageEle.innerHTML = '';
        
        const users = await getUsersFromDb(); // Fetch all users' details
        const currentUser = users.find(user => user.userId === auth.currentUser.uid);
       
                
  //displays logged in user in chat navBar     
        if (currentUser) {
            const chatUserDiv = document.querySelector('.chatUser');
            chatUserDiv.innerHTML = `
                
                <div class="profilechatlocation">
                <img class="user-imgNavbar" src="${currentUser.imageUrl}" alt="${currentUser.fullname}">
                    <div class="profileNavbarName">${currentUser.fullname}</div>
                </div>
            `;
        }

        // Loop through retrieved messages and display them in the UI
        for (let item of messages) {
            
            var color;
            var time_align;
            
            if (item.userId === auth.currentUser.uid) {
                color = "orange";
                time_align = "right";
              
                // Construct HTML for displaying messages with current user's profile
                messageEle.innerHTML += `
                    <div class="message-${color}">
                        <div class="message-bubble">
                            <div class="user-profile">
                                <div class="user-details">
                                    <p class="profileName">${currentUser.fullname}</p>
                                </div>
                                <img class="user-imgchatorg" src="${currentUser.imageUrl}" alt="${currentUser.fullname}" />
                            </div>
                            <p class="message-content">${item.text}</p>
                            <div class="message-timestamp-${time_align}">${new Date(item.createdAt).toLocaleTimeString()}</div>
                        </div>
                    </div>`
                    
                    ;
            } else {
                color = "blue";
                time_align = "left";
                
                // Find the friend's information
                const friend = users.find(user => user.userId === item.userId);
                
                // Construct HTML for displaying messages with friend's profile
                messageEle.innerHTML += `
                    <div class="message-${color}">
                        <div class="message-bubble">
                            <div class="user-profile">
                                <div class="user-details">
                                    <p class="profileName">${friend.fullname}</p>
                                </div>
                                <img class="user-imgchat" src="${friend.imageUrl}" alt="${friend.fullname}" />
                            </div>
                            <p class="message-content">${item.text}</p>
                            <div class="message-timestamp-${time_align}">${new Date(item.createdAt).toLocaleTimeString()}</div>
                        </div>
                    </div>`;
                    
                     
            }
            // Set the scroll position back to where it was
            chatArea.scrollTop = currentScrollPos;
            
        }
      
    });
    
}
//retrieves and display messages from firestore database
getMessages();

