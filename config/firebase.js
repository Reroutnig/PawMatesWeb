// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithEmailAndPassword, onAuthStateChanged} from 'https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js'
import { getFirestore, query, where, setDoc, doc, addDoc, collection, getDoc, getDocs, onSnapshot } from 'https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js'
import { getStorage, ref, ref as sRef, uploadBytes, getDownloadURL } from 'https://www.gstatic.com/firebasejs/10.6.0/firebase-storage.js'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
    apiKey: "AIzaSyCE4N3-_icVHFbWLWI9rqO_E-uXwqB67rk",
    authDomain: "pawmates-a1757.firebaseapp.com",
    databaseURL: "https://pawmates-a1757-default-rtdb.firebaseio.com",
    projectId: "pawmates-a1757",
    storageBucket: "pawmates-a1757.appspot.com",
    messagingSenderId: "212632097126",
    appId: "1:212632097126:web:bb4518a57e31549c2178a7"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// Function to sign in using Firebase authentication
function signInFirebase(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
}

async function signUpFirebase(userInfo) {
    const { email, password } = userInfo

    return createUserWithEmailAndPassword(auth, email, password);
}
// Function to upload an image to Firebase storage
async function uploadImage(image) {
    const storageRef = ref(storage, `images/${image.name}`);
    const snapshot = await uploadBytes(storageRef, image)
    const url = await getDownloadURL(snapshot.ref)
    return url
}


// Function to add user details to Firestore database
function addUserToDb(userInfo) {
    const userId = auth.currentUser.uid;
    const { email, fullname,imageUrl } = userInfo
    return setDoc(doc(db, "users", userId), { email, fullname,imageUrl, userId })

}
// Function to check if a user is logged in or not
function checkUser() {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            // User is signed in
            window.location.replace("home.html")

        } else {
            return
            // User is signed out
        }
    });
}


// Function to retrieve users' data from Firestore database
async function getUsersFromDb() {
    const querySnapshot = await getDocs(collection(db, "users"))
    const users = []
    querySnapshot.forEach((doc) => {
        users.push({ id: doc.id, ...doc.data() })
    });
    return users
}

/*chat config*/

//ensures that the user does not chat with themselves
async function checkRoom(friendId) {
    try {
        const currentUserId = auth.currentUser.uid
        if(currentUserId == friendId){
            alert("can't chat yourself")
            return;
        }
        //compares user's uid to person they want to talk
        const users = { [friendId]: true, [currentUserId]: true }
        const q = query(collection(db, "chatrooms"), where(`users.${friendId}`, "==", true), where(`users.${currentUserId}`, "==", true));
        let room = {}
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            room = doc.data()
            room.id = doc.id
        })
        if (!room.id) {
            return addDoc(collection(db, "chatrooms"), { users, createdAt: Date.now(), lastMessage: {} })
        }
        console.log(room);
        return room;
    } catch (e) {
        console.log(e);

    }
}
// Function to send a message to Firestore database
async function sendMessageToDb(text, roomId) {
    var Messageid = roomId + Date.now();
    const message = { text: text, createdAt: Date.now(), userId: auth.currentUser.uid }
    const DocRef = doc(db, "chatrooms", `${roomId}`, "messages", `${Messageid}`);
    await setDoc(DocRef, message);
    const lastMessageRef = addDoc(collection(db, "chatrooms", `${roomId}`, "lastMessage"), { text: text, userId: auth.currentUser.uid })
    await setDoc(lastMessageRef, { text: text, userId: auth.currentUser.uid });
}
// Function to retrieve messages from Firestore database

async function getMessagesFromDb(roomId, callback) {
    const q = query(collection(db, "chatrooms", `${roomId}`, "messages"))
    onSnapshot(q, (querySnapshot) => {
        const messages = []
        querySnapshot.forEach((doc) => {
            messages.push({ id: doc.id, ...doc.data() })
        })
        console.log(messages);
        callback(messages)
    })
}
function userLogout() {
    auth.signOut();
}


// Exported functions to use in other files
export {
    signInFirebase,
    signUpFirebase,
    uploadImage,
    getUsersFromDb,
    checkRoom,
    addUserToDb,
    checkUser,
    userLogout,
    sendMessageToDb,
    getMessagesFromDb,
    sendPasswordResetEmail,
    getAuth,
    auth,

    //exported consts 
    storage,
    app
}
