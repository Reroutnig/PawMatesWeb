import { auth, db, updateUserProfile, uploadImage } from '/config/firebase.js';

document.addEventListener('DOMContentLoaded', async () => {
    const profileForm = document.getElementById('ProfileForm');

    profileForm.addEventListener('submit', async (e) => {
        e.preventDefault();
    
        const userId = auth.currentUser.uid;
    
        //Getting images
        const imageUpload = document.getElementById('imageUpload');
        const images = imageUpload.files;

        const imageURLs = [];
        if (images.length > 0) {
            for (let i = 0; i < images.length; i++) {
                const imageUrl = await uploadImage(images[i]);
                imageURLs.push(imageUrl);
            }
        }

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
    
        //Get the pet's age
        const petAge = document.getElementById('petAge').value;
        const ageUnit = document.querySelector('input[name="ageUnit"]:checked');
        const selectedAgeUnit = ageUnit ? ageUnit.value : null;
        const petAgeData = `${petAge} ${selectedAgeUnit}`;
    
        //Get the selected pet size
        const size = document.querySelector('input[name="size"]:checked');
        const selectedSize = size ? size.value : null;
    
        //Validate pet age and age unit, requiring both fields if one is selected
        if ((petAge && !selectedAgeUnit) || (!petAge && selectedAgeUnit)) {
            const errorContainer = document.getElementById('errorContainer');
            errorContainer.innerText = 'Please select both pet age and age unit.';
            errorContainer.style.display = 'block';
            return; //Prevent form submission if validation fails
        } else {
            document.getElementById('errorContainer').style.display = 'none';
        }
    

        //Get the selected vaccination status
        const vaccStatus = document.querySelector('input[name="vacc"]:checked');
        const selectedVaccStatus = vaccStatus ? vaccStatus.value : null;

        //Get the selected neutered/spayed status
        const neuSpaStatus = document.querySelector('input[name="neuSpa"]:checked');
        const selectedNeuSpaStatus = neuSpaStatus ? neuSpaStatus.value : null;

        //Prepare profile details object
        const profileDetails = {
            bio: bio,
            availability: availability,
            petType: selectedPetType,
            gender: selectedGender,
            age: petAgeData,
            size: selectedSize,
            vaccinated: selectedVaccStatus,
            neuteredSpayed: selectedNeuSpaStatus,
            images: imageURLs,
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
    
    const cancelBtn = document.getElementById('cancelBtn');

    cancelBtn.addEventListener('click', () => {
        window.location.href = '/views/profile.html';
    });
});