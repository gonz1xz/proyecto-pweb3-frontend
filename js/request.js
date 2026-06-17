import { Auth } from './auth.js';

export async function apiRequest(url, options = {}) {
  options.credentials = 'include';
  
  if (!options.headers) options.headers = {};
  options.headers['Content-Type'] = 'application/json';

  const token = Auth.getToken();
  if (token) {
    options.headers['Authorization'] = `Bearer ${token}`;
  }

  let response = await fetch(url, options);

  if (response.status === 401) {
    console.warn('Token expirado o no enviado, intentando refrescar...');
    
    const newToken = await Auth.refreshToken();
    
    if (newToken) {
      options.headers['Authorization'] = `Bearer ${newToken}`;
      response = await fetch(url, options);
    } else {
      console.error('Sesión inválida.');
      Auth.clearToken();
      window.location.href = 'login.html';
      return; 
    }
  }

  return response.json();
}