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
            window.location.href = "/noteDashboard.html";
        } else {
            window.location.href = "/passwordIncorrect.html";
        }
    } catch (error) {
        console.error("Error:", error);
    }
});