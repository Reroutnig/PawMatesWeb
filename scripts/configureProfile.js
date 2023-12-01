import { auth, db, updateUserProfile } from '/config/firebase.js';

document.addEventListener('DOMContentLoaded', async () => {
    const profileForm = document.getElementById('ProfileForm');

    profileForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const userId = auth.currentUser.uid;

        //Get the bio input
        const bio = document.getElementById('bioInp').value;

        //Get the values of checked checkboxes for availability
        const availability = [];
        const checkboxes = document.getElementsByName('days');
        checkboxes.forEach((checkbox) => {
            if (checkbox.checked) {
                availability.push(checkbox.value);
            }
        });

        //Get the selected pet type
        const petType = document.querySelector('input[name="pettype"]:checked');
        const selectedPetType = petType ? petType.value : null;

        //Get the selected gender
        const gender = document.querySelector('input[name="gender"]:checked');
        const selectedGender = gender ? gender.value : null;

        //Prepare profile details object including bio, availability, pet type, and gender
        const profileDetails = {
            bio: bio,
            availability: availability,
            petType: selectedPetType,
            gender: selectedGender,
        };

        //Updating current user's profile details in the profile page
        try {
            await updateUserProfile(userId, profileDetails);
            console.log('Profile details updated successfully!');
            window.location.href = '/views/profile.html';
        } catch (error) {
            console.error('Error updating profile details:', error);
        }
    });
});
