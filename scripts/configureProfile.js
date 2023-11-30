import { auth, db, updateUserProfile } from '/config/firebase.js';

document.addEventListener('DOMContentLoaded', async () => {
    const profileForm = document.getElementById('ProfileForm');

    profileForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const userId = auth.currentUser.uid;
        const bio = document.getElementById('bioInp').value;

        //Get the values of checked checkboxes
        const availability = [];
        const checkboxes = document.getElementsByName('days');
        checkboxes.forEach((checkbox) => {
            if (checkbox.checked) {
                availability.push(checkbox.value);
            }
        });

        //Prepare profile details object including bio and availability
        const profileDetails = {
            bio: bio,
            availability: availability, //Add the availability array to profile details
        };

        try {
            await updateUserProfile(userId, profileDetails);
            console.log('Profile details updated successfully!');
            window.location.href = '/views/profile.html';
        } catch (error) {
            console.error('Error updating profile details:', error);
        }
    });
});
