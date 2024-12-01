const { readFile, writeFile } = require('../utils/fileUtils');
const fileName = 'users';

exports.registerUser = async (user) => {
    const users = await readFile(fileName);
    const id = users.length ? users[users.length - 1].id + 1 : 1;
    const newUser = { id, ...user };
    users.push(newUser);
    await writeFile(fileName, users);
    return newUser;
};

exports.updateUser = async (id, updatedUser) => {
    const users = await readFile(fileName);
    const index = users.findIndex(user => user.id === id);

    if (index === -1) {
        return null;
    }

    users[index] = { ...users[index], ...updatedUser };
    await writeFile(fileName, users);
    return users[index];
};

exports.deleteUser = async (id) => {
    const users = await readFile(fileName);
    const index = users.findIndex(user => user.id === id);

    if (index === -1) {
        return null;
    }

    const deletedUser = users.splice(index, 1)[0];
    await writeFile(fileName, users);
    return deletedUser;
};

exports.getUserById = async (id) => {
    const users = await readFile(fileName);
    return users.find(user => user.id === id);
};

exports.getAllUsers = async () => {
    return await readFile(fileName);
};

exports.findUserByUsername = async (username) => {
    const users = await readFile(fileName);
    return users.find(user => user.username === username);
};