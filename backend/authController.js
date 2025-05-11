const jwt = require('jsonwebtoken');

// Récupération des secrets depuis les variables d'environnement
const { JWT_SECRET, JWT_REFRESH_SECRET } = process.env;

// Cette fonction vérifie l'expiration du token et génère un nouveau si nécessaire
function refreshToken(req, res) {
    const { refreshToken } = req.body;

    if (!refreshToken) {
        return res.status(401).json({ error: "Refresh token is missing" });
    }

    // Vérifier la validité du refresh token
    jwt.verify(refreshToken, JWT_REFRESH_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ error: "Invalid refresh token" });
        }

        // Si le refresh token est valide, créer un nouveau access token
        const newAccessToken = jwt.sign({ userId: user.userId }, JWT_SECRET, {
            expiresIn: '30m', // Exemple : expiration dans 15 minutes
        });

        res.json({ accessToken: newAccessToken });
    });
}

module.exports = { refreshToken };
