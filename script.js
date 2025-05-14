const signupToggle=document.querySelector(".show-signup");
const loginToggle=document.querySelector(".show-login");
const loginForm=document.querySelector(".login-form");
const signupForm=document.querySelector(".signup-form");

const signUpBtn=document.querySelector(".form-singup");
const loginBtn=document.querySelector(".form-login");

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
//Handling form submission 
// document.getElementsByClassName(".form-login").addEventListener("submit",(e)=>{
//     e.preventDefault();
//     const formData=new FormData(this);
//     fetch("PORT:8080",{
//         method:"POST",
//         body: formData
//     }).then(res=>{
//         if(res.ok){
//             window.location.href="'./pages/home.html'"
//         }else{
//             alert("Sub failed");
//         }
//     })
// })
