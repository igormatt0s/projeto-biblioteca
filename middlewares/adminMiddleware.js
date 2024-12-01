// Verificar se o usuário é administrador
exports.requireAdmin = (req, res, next) => {
    if (!req.user || !req.user.isAdmin) {
        return res.status(403).json({ message: 'Acesso restrito a administradores.' });
    }
    next();
};