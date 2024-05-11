const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const userAccount = document.getElementById("userAccount").value;
    const userPassword = document.getElementById("userPassword").value;
    try {
        const response = await fetch("/users/loginUser", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ userAccount, userPassword }),
        });
        const data = await response.json();
        if (data.success) {
            localStorage.setItem('token', data.token);
            window.location.href = "/noteDashboard.html";
        } else {
            window.location.href = "/passwordIncorrect.html";
        }
    } catch (error) {
        console.error("Error:", error);
    }
});

const loginText = document.querySelector(".title-text .login");
const loginBtn = document.querySelector("label.login");
const signupBtn = document.querySelector("label.signup");
const signupLink = document.querySelector("form .signup-link a");
signupBtn.onclick = (() => {
    loginForm.style.marginLeft = "-50%";
    loginText.style.marginLeft = "-50%";
});
loginBtn.onclick = (() => {
    loginForm.style.marginLeft = "0%";
    loginText.style.marginLeft = "0%";
});
signupLink.onclick = (() => {
    signupBtn.click();
    return false;
});