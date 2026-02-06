const TOKEN_KEY = '@ajf:token'
const USER_KEY = '@ajf:user'

export const storage = {
    setAuth(token, user) {
        localStorage.setItem(TOKEN_KEY, token)
        localStorage.setItem(USER_KEY, JSON.stringify(user));
    },
    getToken(){
        return localStorage.getItem(TOKEN_KEY);
    },

    getUser() {
        const user = localStorage.getItem(USER_KEY);
        return user ? JSON.parse(user) : null
    },

    setUser(user) {
        localStorage.setItem(USER_KEY, JSON.stringify(user));
    },

    clearAuth() {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(USER_KEY);
    },
};