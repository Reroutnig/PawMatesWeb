
import { storage, app, uploadImage } from "../config/firebase.js";
import { ref, uploadBytes } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-storage.js"
import { getFirestore, doc, setDoc, collection, getDocs, addDoc } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js"
import {getAuth} from "https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js"

const db = getFirestore(app);


document.querySelector("#add-post").addEventListener('click', switchAddPost);


function switchAddPost() {
    window.location.href = "../views/createPost.html";
}


let posts = [];
//get posts
const colRef = collection(db, "posts")
await getDocs(colRef).then((snapshot) => {
    snapshot.docs.forEach((doc) => {
        posts.push({...doc.data(), id: doc.id});
    })
    console.log(posts);
});

//display posts
const main = document.querySelector("#posts");
posts.forEach((post) =>{

    const age = document.createElement("p");
    const name = document.createElement("p");
    const size = document.createElement("p");
    const type = document.createElement("p");
    const space = document.createElement("br");

    age.innerHTML = post.age;
    name.innerHTML = post.name;
    size.innerHTML = post.size;
    type.innerHTML = post.type;

    main.appendChild(age);
    main.appendChild(name);
    main.appendChild(size);
    main.appendChild(type);
    main.appendChild(space);
})