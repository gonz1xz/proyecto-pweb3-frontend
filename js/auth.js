
export const Auth = (() => {
    let accessToken = null;

    return {
        setToken: (token) => { accessToken = token; },
        getToken: () => accessToken,
        clearToken: () => { accessToken = null; },
        async refreshToken() {
            try {
                const response = await fetch('http://localhost:3000/auth/refresh-token', {
                    method: 'POST',
                    credentials: 'include', 
                });

                if (!response.ok) throw new Error('No hay sesión');

                const data = await response.json();
                accessToken = data.accessToken;
                return accessToken;
            } catch (error) {
                return null;
            }
        },
    };
})();