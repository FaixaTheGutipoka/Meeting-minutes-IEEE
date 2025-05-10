const signupToggle=document.querySelector(".show-signup");
const loginToggle=document.querySelector(".show-login");
const loginForm=document.querySelector(".login-form");
const signupForm=document.querySelector(".signup-form");

const signUpBtn=document.querySelector(".sign-up-btn");
const loginBtn=document.querySelector(".log-in-btn");


signupToggle.addEventListener("click",(e)=>{
    e.preventDefault();
    loginForm.classList.add("inactive");
    signupForm.classList.add("active");
    // loginForm.classList.add("active")
})
signUpBtn.addEventListener("click",(e)=>{
    e.preventDefault();
    loginForm.classList.add("inactive");
    signupForm.classList.add("active");
    // loginForm.classList.add("active")
})

loginToggle.addEventListener("click",(e)=>{
    e.preventDefault();
    loginForm.classList.remove("inactive");
    signupForm.classList.add("inactive");
})

document.querySelectorAll(".show-signup").forEach(elem => {
    elem.addEventListener("click", (e) => {
        e.preventDefault();
        loginForm.classList.add("inactive");
        signupForm.classList.remove("inactive");
        signupForm.classList.add("active");
    });
});

document.querySelectorAll(".show-login").forEach(elem => {
    elem.addEventListener("click", (e) => {
        e.preventDefault();
        loginForm.classList.remove("inactive");
        signupForm.classList.remove("active");
        signupForm.classList.add("inactive");
    });
});

document.querySelector('.login-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;

    const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    });

    const data = await res.json();
    console.log(data);
});

document.querySelector('.signup-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.querySelector('#name').value;
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;

    const res = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
    });

    const data = await res.json();
    console.log(data);
});
