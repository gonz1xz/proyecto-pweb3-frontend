import { Auth } from './auth.js';

const form = document.getElementById("loginForm");

form.addEventListener("submit", async (e) => {
    e.preventDefault();
  
    const email = document.getElementById("email").value;
    const pass = document.getElementById("password").value;

    console.log("Intentando login con:", { email, pass });

    try {
        const response = await fetch("http://localhost:3000/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: 'include',
            body: JSON.stringify({ email: email, password: pass }),
        });

        const data = await response.json();

        if (response.ok) {
            alert("Login exitoso");
            Auth.setToken(data.accessToken);
            window.location.href = "menu.html";
        } else {
            if(data.message.includes("Usuario o contraseña incorrectos")) {
                alert("Usuario o contraseña incorrectos");
            } else {
                console.error("Error del servidor:", data.message);
            }   
        }
    } catch (error) {
        console.error("No se pudo conectar con el backend:", error);
    }
});