const userModel = require('../models/userModel');

exports.registerUser = (user) => userModel.registerUser(user);

exports.getAllUsers = () => userModel.getAllUsers();

exports.updateUser = (id, updatedUser) => userModel.updateUser(id, updatedUser);

exports.deleteUser = (id) => userModel.deleteUser(id);

exports.getUserById = (id) => userModel.getUserById(id);