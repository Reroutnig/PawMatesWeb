import {addUserToDb, checkUser,signUpFirebase, uploadImage} from "/config/firebase.js"

window.signup = async function (){
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const fullname = document.getElementById("fullname").value;
    const profile = document.getElementById("image").files[0];
    // Check if any input field is empty or profile image is not uploaded
    if(email == "" || password == "" || fullname == "" || profile == undefined){
        alert("All the inputs required");
        return;
    }
    try{
        document.getElementsByClassName("btn-outline-dark")[0].style.display = "none"  
        document.getElementsByClassName("btn-outline-dark")[1].style.display = "inline-block"  
        await signUpFirebase({email,password}); 
        // Upload profile image and retrieve its URL  
        const imageUrl = await uploadImage(profile);
        await addUserToDb({email,fullname,imageUrl})
        // Check if the user is successfully signed up
        checkUser()
    }catch (e){
        switch (e.code){
            // If email is already in use
            case 'auth/email-already-in-use':
                document.getElementsByClassName("btn-outline-dark")[0].style.display = "inline-block"  
                document.getElementsByClassName("btn-outline-dark")[1].style.display = "none" 
                document.getElementById("error").innerText = "Email already registered"
                break;
            // If the password is weak
            case  'auth/weak-password':
                document.getElementsByClassName("btn-outline-dark")[0].style.display = "inline-block"  
                document.getElementsByClassName("btn-outline-dark")[1].style.display = "none" 
                document.getElementById("error").innerText = "Weak password"
                break;
            // Default case for other errors
            default :
            document.getElementsByClassName("btn-outline-dark")[0].style.display = "inline-block"  
            document.getElementsByClassName("btn-outline-dark")[1].style.display = "none" 
            document.getElementById("error").innerText = "unknown error occured"
            
        }
        console.log(e.code)
    }
}



