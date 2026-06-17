import { Auth } from './auth.js';

export async function protectRoute() {
    if (!Auth.getToken()) {
        const newToken = await Auth.refreshToken();
        
        if (!newToken) {
            window.location.href = 'login.html';
        }
    }
}