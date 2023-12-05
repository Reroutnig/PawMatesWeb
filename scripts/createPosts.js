
import { storage, app, uploadImage } from "../config/firebase.js";
import { ref, uploadBytes } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-storage.js"
import { getFirestore, doc, setDoc, collection, getDocs, addDoc } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js"
import {getAuth} from "https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js"
import { checkLoggedInUser} from "/config/firebase.js";

checkLoggedInUser()
    .then((user) => {
        // User is logged in, allow access to the page
        console.log("User is logged in");
    })
    .catch(() => {
        // User is not logged in, redirect to the login page
        console.log("User is not logged in, redirecting to login page");
        window.location.href = "../index.html"; // Redirect to login page
    });


//get db
const db = getFirestore(app);
const auth = getAuth(app);

//add fields to db

document.querySelector("#post").addEventListener('click', addPost);

async function addPost() {
    //validate
    const fileSelector = document.querySelector("#pet-image");
    if (fileSelector.files.length == 0) {
        alert("Please Select a file");
        return;
    }

    const age = document.querySelector("#age").value;
    if (isNaN(age)){
        alert("Please Enter Only a Number");
        return;
    }

    const monthAge = document.querySelector("#month-age");
    const yearAge = document.querySelector("#year-age");
    if (monthAge.checked == false && yearAge.checked == false){
        alert("Please select age type");
        return;
    }

    //upload image
    const file = fileSelector.files[0];

    const imageRef = ref(storage, `postImages/${file.name + Math.floor(Math.random() * 6)}`);
    uploadBytes(imageRef, file).then(() => {
        //alert("Image Uploaded");
    })

    //add data 
    //getting data from html
    const name = document.querySelector("#pet-name").value;
    const size = document.querySelector("#pet-size").value;
    const type = document.querySelector("#pet-type").value;
    const desc = document.querySelector("#desc").value;
    let user = auth.currentUser.uid;
    user = await getUserName(user);
    const image = await uploadImage(file);

    //getting age type
    let ageType;
    if (monthAge.checked == true){
        ageType = monthAge.value;
    }
    else{
        ageType = yearAge.value;
    }


    await addDoc(collection(db, "posts"), {
        age: age,
        name: name,
        size: size,
        type: type,
        user: user,
        image: image,
        ageType: ageType,
        description: desc
    });

    window.location.href = '/views/home.html';
}

async function getUserName(user){
    let users = [];
//get posts
const colRef = collection(db, "users")
await getDocs(colRef).then((snapshot) => {
    snapshot.docs.forEach((doc) => {
        users.push({ ...doc.data(), id: doc.id });
    })
    console.log(users);
});

for (let i = 0; i < users.length; i++){
    if (user == users[i].userId){
        return users[i].fullname;
    }
    else{
        console.log("issue");
    }
}

}
