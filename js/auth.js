document.addEventListener("DOMContentLoaded", function () {
    const registerForm = document.getElementById("registerForm");
    const loginForm = document.getElementById("loginForm");

    function updateNav() {
        const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        const isAdmin = localStorage.getItem('isAdmin') === 'true';
        const firstName = localStorage.getItem('firstName');
        const lastName = localStorage.getItem('lastName');
    
        const adminDashboardLink = document.getElementById('admin_dashboard');
        const navMenu = document.querySelector('.nav-menu ul');
    
        // Remove existing admin dashboard link if any
        if (adminDashboardLink) {
            adminDashboardLink.remove();
        }
    
        // Show or hide links based on login status
        document.getElementById('login-link').style.display = isLoggedIn ? 'none' : 'block';
        document.getElementById('register-link').style.display = isLoggedIn ? 'none' : 'block';
        document.getElementById('logout-link').style.display = isLoggedIn ? 'block' : 'none';
    
        // Add admin dashboard link if the user is an admin
        if (isLoggedIn && isAdmin) {
            const li = document.createElement('li');
            li.id = 'admin_dashboard';
            const a = document.createElement('a');
            a.href = './admin_dashboard.html';
            a.textContent = 'Dashboard';
            li.appendChild(a);
            navMenu.appendChild(li);
        }
    
        // Display the user's name if logged in
        if (isLoggedIn && firstName && lastName) {
            const userNameDisplay = document.getElementById('user_name_display');
            if (userNameDisplay) {
                userNameDisplay.textContent = `Welcome, ${firstName} ${lastName}`;
            } else {
                const li = document.createElement('li');
                li.id = 'user_name_display';
                li.textContent = `Welcome, ${firstName} ${lastName}`;
                navMenu.appendChild(li);
            }
        }
    }    

    function logout() {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('isAdmin');
        updateNav();
        alert("You have logged out.");
        window.location.href = "index.html";
    }

    window.logout = logout;

    updateNav();

    if (registerForm) {
        registerForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const username = document.getElementById("username").value;
            const firstName = document.getElementById("firstName").value;
            const lastName = document.getElementById("lastName").value;
            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;
            const staff = document.getElementById("staff").checked;

            fetch("https://zymzoo.onrender.com/register/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: username,
                    first_name: firstName,
                    last_name: lastName,
                    email: email,
                    password: password,
                    is_staff: staff
                }),
            })
                .then(response => response.json())
                .then(data => {
                    if (data.id) {
                        alert("Registration successful! Redirecting to login page...");
                        window.location.href = "login.html";
                    } else {
                        alert("Registration failed. Please try again or Check Your Email.");
                    }
                })
                .catch(error => console.error('Error:', error));
        });
    }

    if (loginForm) {
        loginForm.addEventListener("submit", function (e) {
            e.preventDefault();
    
            const username = document.getElementById("loginUsername").value;
            const password = document.getElementById("loginPassword").value;
    
            fetch("https://zymzoo.onrender.com/login/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: username,
                    password: password
                }),
            })
            .then(response => response.json())
            .then(data => {
                console.log(data); // Check what is returned here
                if (data.token) {
                    localStorage.setItem('isLoggedIn', 'true');
                    localStorage.setItem('firstName', data.first_name);
                    localStorage.setItem('lastName', data.last_name);
                    if (data.is_staff !== undefined) {
                        localStorage.setItem('isAdmin', data.is_staff.toString());
                    }
                    updateNav(); // Update the navigation menu
                    alert("Login successful! Redirecting to home page...");
                    window.location.href = "index.html";
                } else {
                    alert("Login failed. Please try again.");
                }
            })            
            .catch(error => console.error('Error:', error));
        });
    }    
});
