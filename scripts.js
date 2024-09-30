document.addEventListener('DOMContentLoaded', function() {
    // Handle login form submission
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            fetch('login.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: new URLSearchParams({
                    email: email,
                    password: password
                })
            })
            .then(response => response.text())
            .then(data => {
                if (data === 'Login successful') {
                    window.location.href = 'index.html'; // Redirect to home page on success
                } else {
                    alert(data); // Show error message if login fails
                }
            })
            .catch(error => console.error('Error:', error));
        });
    }

    // Handle registration form submission
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            fetch('register.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: new URLSearchParams({
                    name: name,
                    email: email,
                    password: password
                })
            })
            .then(response => response.text())
            .then(data => {
                if (data === 'Registration successful') {
                    window.location.href = 'login.html'; // Redirect to login page on successful registration
                } else {
                    alert(data); // Show error message if registration fails
                }
            })
            .catch(error => console.error('Error:', error));
        });
    }

    // Load providers in appointment form
    const providerSelect = document.getElementById('provider');
    if (providerSelect) {
        fetch('providers.json')
            .then(response => response.json())
            .then(data => {
                if (Array.isArray(data.providers)) {
                    data.providers.forEach(provider => {
                        const option = document.createElement('option');
                        option.value = provider.id;
                        option.textContent = provider.name;
                        providerSelect.appendChild(option);
                    });
                } else {
                    console.error('Error fetching providers:', data);
                }
            })
            .catch(error => console.error('Error:', error));
    }

    // Load products in products page
    const productsContainer = document.getElementById('productsContainer');
    if (productsContainer) {
        fetch('products.json')
            .then(response => response.json())
            .then(data => {
                if (Array.isArray(data.products)) {
                    data.products.forEach(product => {
                        const div = document.createElement('div');
                        div.classList.add('product');
                        div.innerHTML = `
                            <h3>${product.name}</h3>
                            <p>${product.description}</p>
                            <p><strong>Price:</strong> KSH ${product.price}</p>
                        `;
                        productsContainer.appendChild(div);
                    });
                } else {
                    productsContainer.innerHTML = `<p>Error fetching products: ${data.error}</p>`;
                }
            })
            .catch(error => console.error('Error:', error));
    }

    // Load resources in resources page
    const resourcesSection = document.getElementById('resources');
    if (resourcesSection) {
        fetch('resources.json')
            .then(response => response.json())
            .then(data => {
                if (Array.isArray(data.resources)) {
                    data.resources.forEach(resource => {
                        const div = document.createElement('div');
                        div.classList.add('resource');
                        div.innerHTML = `
                            <h3>${resource.title}</h3>
                            <p>${resource.description}</p>
                            <a href="${resource.url}" target="_blank">Read more</a>
                        `;
                        resourcesSection.appendChild(div);
                    });
                } else {
                    resourcesSection.innerHTML = `<p>Error fetching resources: ${data.error}</p>`;
                }
            })
            .catch(error => console.error('Error:', error));
    }

    // Load user profile data
    const profileSection = document.getElementById('profile');
    if (profileSection) {
        fetch('profile.json')
            .then(response => response.json())
            .then(data => {
                const { profile } = data;
                if (profile) {
                    profileSection.innerHTML = `
                        <h2>${profile.name}</h2>
                        <p>${profile.bio}</p>
                        <p><strong>Qualifications:</strong> ${profile.qualifications}</p>
                        <p><strong>Email:</strong> ${profile.email}</p>
                    `;
                } else {
                    profileSection.innerHTML = `<p>Error fetching profile data.</p>`;
                }
            })
            .catch(error => console.error('Error:', error));
    }

    // Handle appointment booking
    const appointmentForm = document.getElementById('appointmentForm');
    if (appointmentForm) {
        appointmentForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const providerId = document.getElementById('provider').value;
            const date = document.getElementById('date').value;
            const time = document.getElementById('time').value;

            fetch('bookAppointment.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: new URLSearchParams({
                    provider: providerId,
                    date: date,
                    time: time
                })
            })
            .then(response => response.text())
            .then(data => {
                if (data.includes('successfully')) {
                    alert('Appointment booked successfully!'); // Updated message
                    appointmentForm.reset(); // Reset form on success
                } else {
                    alert(data); // Show booking error message
                }
            })
            .catch(error => console.error('Error:', error));
        });
    }

    // Handle profile update
    const profileUpdateForm = document.getElementById('profileUpdateForm');
    if (profileUpdateForm) {
        profileUpdateForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const name = document.getElementById('name').value;
            const bio = document.getElementById('bio').value;
            const qualifications = document.getElementById('qualifications').value;

            fetch('updateProfile.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: new URLSearchParams({
                    name: name,
                    bio: bio,
                    qualifications: qualifications
                })
            })
            .then(response => response.text())
            .then(data => {
                alert(data); // Show update message
            })
            .catch(error => console.error('Error:', error));
        });
    }
});
