const TOKEN_KEY = '@ajf:token'
const USER_KEY = '@ajf:user'
const REMEMBER_KEY = '@ajf:remember'

function normalizeStoredValue(value) {
    if (value == null) return null;
    const trimmedValue = String(value).trim();
    if (!trimmedValue || trimmedValue === 'null' || trimmedValue === 'undefined') {
        return null;
    }
    return trimmedValue;
}

export const storage = {
    setAuth(token, user, remember = false) {
        const targetStorage = remember ? localStorage : sessionStorage;
        const otherStorage = remember ? sessionStorage : localStorage;

        targetStorage.setItem(TOKEN_KEY, token)
        targetStorage.setItem(USER_KEY, JSON.stringify(user));

        otherStorage.removeItem(TOKEN_KEY);
        otherStorage.removeItem(USER_KEY);

        if (remember) {
            localStorage.setItem(REMEMBER_KEY, 'true');
        } else {
            localStorage.removeItem(REMEMBER_KEY);
        }
    },
    getToken(){
        const sessionToken = normalizeStoredValue(sessionStorage.getItem(TOKEN_KEY));
        if (sessionToken) return sessionToken;

        const remember = localStorage.getItem(REMEMBER_KEY) === 'true';
        if (!remember) {
            localStorage.removeItem(TOKEN_KEY);
            localStorage.removeItem(USER_KEY);
            return null;
        }

        const token = normalizeStoredValue(localStorage.getItem(TOKEN_KEY));
        if (!token) {
            localStorage.removeItem(TOKEN_KEY);
        }
        return token;
    },

    getUser() {
        const sessionUser = sessionStorage.getItem(USER_KEY);
        if (sessionUser) {
            try {
                const parsedSessionUser = JSON.parse(sessionUser);
                if (!parsedSessionUser || typeof parsedSessionUser !== 'object') {
                    sessionStorage.removeItem(USER_KEY);
                    return null;
                }
                return parsedSessionUser;
            } catch {
                sessionStorage.removeItem(USER_KEY);
                return null;
            }
        }

        const remember = localStorage.getItem(REMEMBER_KEY) === 'true';
        if (!remember) {
            localStorage.removeItem(USER_KEY);
            return null;
        }

        const user = localStorage.getItem(USER_KEY);
        if (!user) return null;

        try {
            const parsedUser = JSON.parse(user);
            if (!parsedUser || typeof parsedUser !== 'object') {
                localStorage.removeItem(USER_KEY);
                return null;
            }
            return parsedUser;
        } catch {
            localStorage.removeItem(USER_KEY);
            return null;
        }
    },

    setUser(user) {
        const sessionToken = normalizeStoredValue(sessionStorage.getItem(TOKEN_KEY));
        const remember = localStorage.getItem(REMEMBER_KEY) === 'true';
        const targetStorage = sessionToken ? sessionStorage : remember ? localStorage : null;

        if (!targetStorage) return;

        targetStorage.setItem(USER_KEY, JSON.stringify(user));
    },

    clearAuth() {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(USER_KEY);
        localStorage.removeItem(REMEMBER_KEY);
        sessionStorage.removeItem(TOKEN_KEY);
        sessionStorage.removeItem(USER_KEY);
    },
};