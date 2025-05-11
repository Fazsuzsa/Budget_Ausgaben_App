const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Fonction pour hasher un mot de passe
async function hashPassword(plainPassword) {
    const saltRounds = 10;
    const hashed = await bcrypt.hash(plainPassword, saltRounds);
    return hashed;
}

// Fonction pour vérifier un mot de passe
async function verifyPassword(hashedPassword, inputPassword) {
    return await bcrypt.compare(inputPassword, hashedPassword);
}

// Fonction pour générer un token JWT
function generateToken(userId) {
    const payload = { userId };
    const secret = process.env.JWT_SECRET;
    const options = { expiresIn: process.env.JWT_EXPIRATION };
    return jwt.sign(payload, secret, options);
}

module.exports = { hashPassword, verifyPassword, generateToken };
