const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../configs/config');
const saltRounds = 5;

module.exports = {
    hashPassword: async (password) => {
        try {
            let hashedPassword = await bcrypt.hash(password, saltRounds);
            return hashedPassword;
        }
        catch (err) {
            console.log(err);
        }
    },
    comparePassword: async (password, hash) => {
        return await bcrypt.compare(password, hash);
    },
    generateToken: (payload, options) => {
        return jwt.sign(payload, config.jwt.secretKey, options);
    },
    verifyToken: (token) => {
        return jwt.verify(token, config.jwt.secretKey);
    },
    generateRandomPassword: () => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let password = '';
        for (let i = 0; i < 10; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            password += characters[randomIndex];
        }
        return password;
    }
}