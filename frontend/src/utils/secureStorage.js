import CryptoJS from 'crypto-js';

// En un proyecto real, esto vendría de import.meta.env.VITE_ENCRYPTION_KEY
const SECRET_KEY = 'cemaco-secret-key-2026';

export const secureStorage = {
    getItem: (name) => {
        const str = localStorage.getItem(name);
        if (!str) return null;

        try {
            const bytes = CryptoJS.AES.decrypt(str, SECRET_KEY);
            const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
            return decryptedData;
        } catch (e) {
            console.error(`Error al desencriptar la sesión local: ${e.error}`);
            return null;
        }
    },

    setItem: (name, value) => {
        const encryptedData = CryptoJS.AES.encrypt(value, SECRET_KEY).toString();
        localStorage.setItem(name, encryptedData);
    },

    removeItem: (name) => {
        localStorage.removeItem(name);
    },
};