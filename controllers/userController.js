const userService = require('../services/userService');

exports.registerUser = async (req, res) => {
    const newUser = await userService.registerUser(req.body);
    res.status(201).json(newUser);
}

exports.getAllUsers = async (req, res) => {
    const users = await userService.getAllUsers();
    res.status(200).json(users);
}

exports.getUserById = async (req, res) => {
    const user = await userService.getUserById(parseInt(req.params.id, 10));

    if(!user){
        return res.status(404).json({ message: 'Usuário não encontrado.' });
    }

    res.status(200).json(user);
}

exports.deleteUser = async (req, res) => {
    try {
        const userToDelete = await userService.getUserById(parseInt(req.params.id, 10));
        if (!userToDelete) {
            return res.status(404).json({ message: 'Usuário não encontrado.' });
        }

        // Exclui o usuário
        const deletedUser = await userService.deleteUser(parseInt(req.params.id, 10));
        res.status(200).json({ message: 'Usuário excluído com sucesso.', user: deletedUser });
    } catch (err) {
        res.status(500).json({ message: 'Erro ao excluir o usuário.', error: err.message });
    }
};

exports.updateUser = async (req, res) => {
    try {
        // Atualiza os dados do usuário
        const updatedUser = await userService.updateUser(parseInt(req.params.id, 10), req.body);
        if (!updatedUser) {
            return res.status(404).json({ message: 'Usuário não encontrado.' });
        }

        res.status(200).json({ message: 'Dados do usuário atualizados com sucesso.', user: updatedUser });
    } catch (err) {
        res.status(500).json({ message: 'Erro ao atualizar os dados do usuário.', error: err.message });
    }
};
