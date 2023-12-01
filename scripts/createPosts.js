
import { storage, app, uploadImage } from "../config/firebase.js";
import { ref, uploadBytes } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-storage.js"
import { getFirestore, doc, setDoc, collection, getDocs, addDoc } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js"
import {getAuth} from "https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js"


//get db
const db = getFirestore(app);
const auth = getAuth(app);

//add fields to db

document.querySelector("#post").addEventListener('click', addPost);
async function addPost() {
    //add image
    const fileSelector = document.querySelector("#pet-image");
    if (fileSelector.files.length == 0) {
        return;
    }

    const file = fileSelector.files[0];

    const imageRef = ref(storage, `postImages/${file.name + Math.floor(Math.random() * 6)}`);
    uploadBytes(imageRef, file).then(() => {
        alert("Image Uploaded");
    })

    //add data 
    //getting data from html
    const name = document.querySelector("#pet-name").value;
    const age = document.querySelector("#age").value;
    const size = document.querySelector("#pet-size").value;
    const type = document.querySelector("#pet-type").value;
    const user = auth.currentUser.uid;
    const image = await uploadImage(file);


    //used to get parts of docs
    // const colRef = collection(db, "users")
    // getDocs(colRef).then((snapshot) => {
    //     let users = [];
    //     for(let i = 0; i < snapshot.docs.length; i++){
    //         if(doc.id == auth.currentUser.uid){
    //             user = doc[i].
    //         }
    //     }
    // })

    await addDoc(collection(db, "posts"), {
        age: age,
        name: name,
        size: size,
        type: type,
        user: user,
        image: image
    });
}
