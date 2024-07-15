document.addEventListener("DOMContentLoaded", function () {
    const registerForm = document.getElementById("registerForm");
    const loginForm = document.getElementById("loginForm");

    function updateNav() {
        const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        document.getElementById('login-link').style.display = isLoggedIn ? 'none' : 'block';
        document.getElementById('register-link').style.display = isLoggedIn ? 'none' : 'block';
        document.getElementById('logout-link').style.display = isLoggedIn ? 'block' : 'none';
    }

    function logout() {
        localStorage.removeItem('isLoggedIn');
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
                    if (data.token) {
                        localStorage.setItem('isLoggedIn', 'true');
                        updateNav();
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
