const signupToggle = document.querySelector(".show-signup");
const loginToggle = document.querySelector(".show-login");
const loginForm = document.querySelector(".login-form");
const signupForm = document.querySelector(".signup-form");

// Corrected selectors based on your HTML
const signUpBtn = document.querySelector(".signup-form .form-login"); // Selector for signup submit button
const loginBtn = document.querySelector(".login-form .form-login");   // Selector for login submit button

signupToggle.addEventListener("click", (e) => {
    e.preventDefault();
    loginForm.classList.add("inactive");
    signupForm.classList.remove("inactive"); // Use remove to show signup form
});

loginToggle.addEventListener("click", (e) => {
    e.preventDefault();
    loginForm.classList.remove("inactive");
    signupForm.classList.add("inactive");
});

if (signUpBtn) {
    signUpBtn.addEventListener("click", (e) => {
        e.preventDefault();
        const formData = new FormData(signupForm);
        const csrfToken = getCookie('csrftoken'); // Function to get CSRF token

        fetch("/signup/", {
            method: "POST",
            headers: {
                'X-CSRFToken': csrfToken
            },
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                window.location.href = data.redirect;
            } else if (data.status === 'error') {
                // Display signup errors to the user (you'll need to update your HTML to show these)
                console.error("Signup failed:", data.errors);
                alert("Signup failed. Please check the form.");
                // You might want to update the UI to display specific error messages
            } else {
                alert("Signup failed due to an unexpected error.");
            }
        })
        .catch(error => {
            console.error("Error during signup:", error);
            alert("Signup failed. Please try again later.");
        });
    });
}

if (loginBtn) {
    loginBtn.addEventListener("click", (e) => {
        e.preventDefault();
        const formData = new FormData(loginForm);
        const csrfToken = getCookie('csrftoken'); // Function to get CSRF token

        fetch("/login/", {
            method: "POST",
            headers: {
                'X-CSRFToken': csrfToken
            },
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                window.location.href = data.redirect;
            } else if (data.status === 'error') {
                // Display login errors to the user (you'll need to update your HTML to show these)
                console.error("Login failed:", data.errors);
                alert("Login failed. Please check your username and password.");
                // You might want to update the UI to display specific error messages
            } else {
                alert("Login failed due to an unexpected error.");
            }
        })
        .catch(error => {
            console.error("Error during login:", error);
            alert("Login failed. Please try again later.");
        });
    });
}

// Function to get the CSRF token from the cookie
function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            let cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.startsWith(name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}