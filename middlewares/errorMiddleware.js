module.exports = (err, req, res, next) => {
    const status = err.status || 500;
    res.status(status).json({
        message: err.message || 'Erro interno no servidor.',
        details: err.details || null
    });
};