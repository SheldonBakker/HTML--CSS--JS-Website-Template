// Define the function in the global scope
function initGoogleMapsAutocomplete() {
    const autocomplete = new google.maps.places.Autocomplete(
        document.getElementById('street_address'),
        {
            types: ['address'],
            componentRestrictions: { country: 'za' } // Restrict to South Africa
        }
    );

    autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();
        if (!place.geometry) {
            console.log('No details available for input: ' + place.name);
            return;
        }
        // Fill in address fields
        document.getElementById('street_address').value = place.address_components.find(component => component.types.includes('route'))?.long_name || '';
        document.getElementById('city').value = place.address_components.find(component => component.types.includes('locality'))?.long_name || '';
        document.getElementById('province').value = place.address_components.find(component => component.types.includes('administrative_area_level_1'))?.long_name || '';
        document.getElementById('postcode').value = place.address_components.find(component => component.types.includes('postal_code'))?.long_name || '';
        document.getElementById('country').value = place.address_components.find(component => component.types.includes('country'))?.long_name || '';
    });
}

// Load Google Maps API and Places library
function loadGoogleMapsAPI() {
    const script = document.createElement('script');
    script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCVNCZrnN1aH810WmbfIMOV9M-mKJ84EPI&libraries=places&callback=initGoogleMapsAutocomplete';
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
}

// Initialize form functionality
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('multiStepForm');
    const formSections = document.querySelectorAll('.form-section');
    const circles = document.querySelectorAll('.circle');
    let currentStep = 1;

    function showStep(step) {
        formSections.forEach((section, index) => {
            section.classList.toggle('hidden', index + 1 !== step);
            section.classList.toggle('fade-in', index + 1 === step);
        });

        circles.forEach((circle, index) => {
            circle.classList.toggle('active', index + 1 === step);
        });

        document.querySelectorAll('[id^="next-"], [id^="prev-"]').forEach(button => {
            button.style.display = (button.id === `next-${step}` || button.id === `prev-${step}`) ? 'inline-block' : 'none';
        });
    }

    document.querySelectorAll('[id^="next-"]').forEach(button => {
        button.addEventListener('click', () => {
            if (validateStep(currentStep)) {
                currentStep += 1;
                if (currentStep > formSections.length) {
                    currentStep = formSections.length;
                }
                showStep(currentStep);
            }
        });
    });

    document.querySelectorAll('[id^="prev-"]').forEach(button => {
        button.addEventListener('click', () => {
            currentStep -= 1;
            if (currentStep < 1) {
                currentStep = 1;
            }
            showStep(currentStep);
        });
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            const nextButton = document.getElementById(`next-${currentStep}`);
            if (nextButton && currentStep < formSections.length) {
                nextButton.click();
            }
        }
    });

    function validateStep(step) {
        const currentSection = document.getElementById(`step-${step}`);
        const inputs = currentSection.querySelectorAll('input, select');
        let valid = true;
        inputs.forEach(input => {
            if (!input.checkValidity()) {
                valid = false;
                input.classList.add('border-red-500');
            } else {
                input.classList.remove('border-red-500');
            }
        });
        return valid;
    }

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const formData = new FormData(form);
        const response = await fetch('form-handler.php', {
            method: 'POST',
            body: formData
        });
        const result = await response.json();

        if (result.status === 'success') {
            alert(result.message);
            setTimeout(() => {
                window.location.href = 'index.html'; // Redirect to home page
            }, 5000);
        } else {
            alert(result.message);
        }
    });

    // Load Google Maps API
    loadGoogleMapsAPI();

    // Initial display
    showStep(currentStep);
});

form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    try {
        const response = await fetch('form-handler.php', {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const result = await response.json();

        if (result.status === 'success') {
            alert(result.message);
            setTimeout(() => {
                window.location.href = 'index.html'; // Redirect to home page
            }, 5000);
        } else {
            alert(result.message);
        }
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
});

const response = await fetch('php/form-handler.php', {
    method: 'POST',
    body: formData
});

