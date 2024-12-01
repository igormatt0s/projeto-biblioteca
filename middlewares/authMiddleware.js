const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;

exports.authenticate = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(401).json({ message: 'Token não fornecido.' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded; // Decodifica o token e armazena os dados do usuário
        next();
    } catch (err) {
        res.status(401).json({ message: 'Token inválido ou expirado.', error: err.message });
    }
};
