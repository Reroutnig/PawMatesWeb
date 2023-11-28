//import functions from firebase.js
import { sendMessageToDb,getMessagesFromDb,auth} from "/config/firebase.js";


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
//retrieves and display messages from firestore database
getMessages()

function getMessages(){
    // Get messages from the database based on the current room ID
    getMessagesFromDb(myroomId,(messages)=>{
        const messageEle = document.getElementById("messages");
        messageEle.innerHTML = '';
         // Loop through retrieved messages and display them in the UI
        for(let item of messages){
            var color;
            var time_align;
            if(item.userId === auth.currentUser.uid){
                color = "orange"
                time_align = "right"
            }
            else{
                color = "blue"
                time_align = "left"
                console.log(auth.currentUser.uid)
            }
            // Construct HTML for displaying messages with styling
            messageEle.innerHTML += `    <div class="message-${color}">
            <p class="message-content">${item.text}</p>
            <div class="message-timestamp-${time_align}">${new Date(item.createdAt).toLocaleTimeString()}</div>
        </div>`
        }
    })

}

   