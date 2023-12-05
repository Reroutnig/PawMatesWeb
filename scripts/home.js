
import { storage, app, uploadImage } from "../config/firebase.js";
import { ref, uploadBytes } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-storage.js"
import { getFirestore, doc, setDoc, collection, getDocs, addDoc, query, orderBy } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js"
import { getAuth } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js"
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
const db = getFirestore(app);


document.querySelector("#add-post").addEventListener('click', switchAddPost);


function switchAddPost() {
    window.location.href = "../views/createPost.html";
}



let posts = [];
//get posts
const colRef = collection(db, "posts");
//query test
// const q = query(colRef, orderBy("type"));
// console.log(q);

await getDocs(colRef).then((snapshot) => {
    snapshot.docs.forEach((doc) => {
        posts.push({ ...doc.data(), id: doc.id });
    })
    console.log(posts);
});

const main = document.querySelector("#posts");

//get Sorts
const petTypeSelector = document.querySelector("#pet-type");
let petType = petTypeSelector.value;
let petAgeSelector = document.querySelector("#age");
let petAge = petAgeSelector.value;
let petSizeSelector = document.querySelector("#pet-size");
let petSize = petSizeSelector.value;

petTypeSelector.addEventListener("change", getPosts);
petAgeSelector.addEventListener("change", getPosts);
petSizeSelector.addEventListener("change", getPosts);


//display posts
getPosts();





function getPosts(){
    petType = petTypeSelector.value;
    petAge = petAgeSelector.value;
    petSize = petSizeSelector.value;

    main.innerHTML = "";
    for (let i = 0; i < posts.length; i++){

        if (petType != "All" ||  petAge != "All" || petSize != "All"){
            if ((posts[i].type == petType || petType == "All") && (inRange(posts[i].age, petAge, posts[i].ageType)|| petAge == "All") && (posts[i].size == petSize|| petSize == "All")){

                displayPosts(posts[i].image, posts[i].name, posts[i].type, posts[i].age, posts[i].size, posts[i].user, posts[i].ageType, posts[i].description);
            }
        }
        else{
            displayPosts(posts[i].image, posts[i].name, posts[i].type, posts[i].age, posts[i].size, posts[i].user, posts[i].ageType, posts[i].description);
        }
    
    
    }
}

function displayPosts(postImage, postName, postType, postAge, postSize, postUser, ageType, desc){
    const postDiv = document.createElement("div");
    postDiv.className = "post-div";

    postDiv.innerHTML = `<img src='${postImage}' alt="pfp" 
    style="object-fit: scale-down;
    width: 150px;
    height: 150px;">
    <h3>${postUser}</h3>
    <h2>${postName}</h2>
    <p>${postType}</p>
    <p>${postAge} ${ageType}</p>
    <p>${postSize}</p>
    <p>${desc}</p>
    <br>`

    main.appendChild(postDiv);
}


function inRange(postAge, selectAge, ageType){
    if (ageType == "Months" && selectAge == "0-12mo"){
        return true;
    }
    else if (ageType == "Years" && selectAge == "1-5yrs" && postAge <= 5){
        return true;
    }
    else if (ageType == "Years" && selectAge == "5-10yrs" && postAge <= 10 && postAge >= 5){
        return true;
    }
    else if (ageType == "Years" && selectAge == "10+yrs" && postAge >= 10){
        return true;
    }
    else{
        return false;
    }
}
