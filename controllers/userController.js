const userService = require('../services/userService');

exports.registerUser = (req, res) => {
    const newUser = userService.registerUser(req.body);
    res.status(201).json(newUser);
}

exports.getUserById = (req, res) => {
    const user = userService.getUserById(parseInt(req.params.id, 10));

    if(!user){
        return res.status(404).json({ message: 'Usuário não encontrado.' });
    }

    res.status(200).json(user);
}

exports.updateUser = async (req, res) => {
    try {
        const { id } = req.user;
        const { userId, updatedData } = req.body;

        // Atualiza os dados do usuário
        const updatedUser = await userService.updateUser(userId, updatedData);
        if (!updatedUser) {
            return res.status(404).json({ message: 'Usuário não encontrado.' });
        }

        res.status(200).json({ message: 'Dados do usuário atualizados com sucesso.', user: updatedUser });
    } catch (err) {
        res.status(500).json({ message: 'Erro ao atualizar os dados do usuário.', error: err.message });
    }
}

exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.user;
        const { userId } = req.body;

        const userToDelete = await userService.getUserById(userId);
        if (!userToDelete) {
            return res.status(404).json({ message: 'Usuário não encontrado.' });
        }

        // Exclui o usuário
        const deletedUser = await userService.deleteUser(userId);
        res.status(200).json({ message: 'Usuário excluído com sucesso.', user: deletedUser });
    } catch (err) {
        res.status(500).json({ message: 'Erro ao excluir o usuário.', error: err.message });
    }
};
