import { Auth } from './auth.js';

const form = document.getElementById("registerForm");

form.addEventListener("submit", async (e) => {
    e.preventDefault();
  
    const email = document.getElementById("email").value;
    const pass = document.getElementById("password").value;
    const confirmPass = document.getElementById("confirmPassword").value;

    if(pass !== confirmPass) {
        alert("Las contraseñas no coinciden");
        return;
    }


    console.log("Intentando register con:", { email, pass, confirmPass });

    try {
        const response = await fetch("http://localhost:3000/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: email, password: pass, confirmPassword: confirmPass }),
        });

        const data = await response.json();

        if (response.ok) {
            alert("Registro exitoso");
            Auth.setToken(data.accessToken);
            window.location.href = "menu.html";
        } else {
            alert("Error del servidor:", data.message);
        }
    } catch (error) {
        console.error("No se pudo conectar con el backend:", error);
    }
});