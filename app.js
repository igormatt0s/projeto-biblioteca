const express = require('express');
const bookRoutes = require('./routes/bookRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();
app.use(express.json());
app.use('/books', bookRoutes);
app.use('/users', userRoutes);

app.listen(3000, () => {
  console.log('Servidor ouvindo a porta 3000');
});
