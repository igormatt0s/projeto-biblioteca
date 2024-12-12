const jwt = require('jsonwebtoken');
const userService = require('../services/userService');

const JWT_SECRET = process.env.JWT_SECRET;

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Busca o usuário pelo username
        const user = await userService.findUserByUsername(username);
        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado.' });
        }

        if (user.password !== password) {
            return res.status(401).json({ message: 'Credenciais inválidas.' });
        }

        // Gera o token JWT
        const token = jwt.sign({ id: user.id, isAdmin: user.isAdmin }, JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ message: 'Login realizado com sucesso.', token });
    } catch (err) {
        next(err);
    }
};
