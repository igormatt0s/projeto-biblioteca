require('dotenv').config();

const express = require('express');
const bookRoutes = require('./routes/bookRoutes');
const userRoutes = require('./routes/userRoutes');
const loanRoutes = require('./routes/loanRoutes')
const userController = require('./controllers/userController');

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use('/books', bookRoutes);
app.use('/users', userRoutes);
app.use('/loans', loanRoutes);

app.get('/install', userController.installAdmin);

app.listen(PORT, () => {
  console.log(`Servidor funcionando na porta ${PORT}...`);
});
