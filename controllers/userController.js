const userService = require('../services/userService');
const { paginate } = require('../utils/paginationUtils');

exports.registerUser = async (req, res) => {
    const newUser = await userService.registerUser({...req.body, isAdmin: false});
    res.status(201).json(newUser);
}

exports.getAllUsers = async (req, res) => {
    try {
        const { limite, pagina } = req.query;

        const users = await userService.getAllUsers();
        const result = paginate(users, limite, pagina);

        res.status(200).json(result);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.getUserById = async (req, res) => {
    const { id } = req.user;

    const user = await userService.getUserById(parseInt(req.params.id, 10));
    if (id !== parseInt(req.params.id, 10) && (!req.user || !req.user.isAdmin)) {
        return res.status(403).json({ message: 'Acesso negado. Apenas administradores podem visualizar os usuários.' });
    }

    if(!user){
        return res.status(404).json({ message: 'Usuário não encontrado.' });
    }

    res.status(200).json(user);
}

exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.user;

        // Verifica se o usuário atual é administrador
        if (id !== parseInt(req.params.id, 10) && (!req.user || !req.user.isAdmin)) {
            return res.status(403).json({ message: 'Acesso negado. Apenas administradores podem excluir usuários.' });
        }
        
        // Verifica se o usuário a ser deletado não é administrador
        const userToDelete = await userService.getUserById(parseInt(req.params.id, 10));
        if (!userToDelete) {
            return res.status(404).json({ message: 'Usuário não encontrado.' });
        }
        if (userToDelete.isAdmin && (userToDelete.id !== id)) {
            return res.status(403).json({ message: 'Não é permitido excluir outros administradores.' });
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
        const { id } = req.user;

        // Verifica se o usuário está tentando alterar seus próprios dados ou é um administrador
        const currentUser = await userService.getUserById(parseInt(req.params.id, 10));
        if (id !== parseInt(req.params.id, 10) && (!req.user || !req.user.isAdmin)) {
            return res.status(403).json({ message: 'Acesso negado. Apenas administradores podem atualizar os dados de outros usuários.' });
        }

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

exports.installAdmin = async (req, res) => {
    try {
        // Cria o usuário administrador default
        const adminUser = {
            name: 'Admin',
            email: 'admin@admin.com',
            username: 'admin',
            password: '12345'
        };

        // Verifica se já existe um administrador
        const adminExists = await userService.findUserByUsername(adminUser.username);
        if (adminExists) {
            return res.status(200).json({ message: 'Usuário administrador já existe.' });
        }

        const createdAdmin = await userService.registerUser({...adminUser, isAdmin: true});

        res.status(201).json({ 
            message: 'Administrador padrão criado com sucesso.', 
            admin: createdAdmin 
        });
    } catch (err) {
        res.status(500).json({
            message: 'Erro ao criar o usuário administrador.',
            error: err.message,
        });
    }
};

exports.createAdmin = async (req, res) => {
    try {
        const { id } = req.user;

        // Verifica se o usuário atual é administrador
        const currentUser = await userService.getUserById(id);
        if (!currentUser || !currentUser.isAdmin) {
            return res.status(403).json({ message: 'Acesso negado. Apenas administradores podem criar outros usuários administradores.' });
        }

        const createdUser = await userService.registerUser({...req.body, isAdmin: true});

        res.status(200).json({ message: 'Usuário administrador criado com sucesso.', user: createdUser });
    } catch (err) {
        res.status(500).json({ message: 'Erro ao criar o usuário administrador.', error: err.message });
    }
};