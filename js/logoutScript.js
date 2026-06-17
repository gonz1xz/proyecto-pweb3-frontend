import { Auth } from './auth.js';

const logoutBtn = document.getElementById("logoutBtn");

logoutBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    await fetch("http://localhost:3000/auth/logout", {
        method: "POST",
        credentials: 'include',
    });

    Auth.clearToken();
    
    window.location.href = "login.html";
});