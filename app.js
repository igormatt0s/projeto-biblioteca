const express = require('express');
const bookRoutes = require('./routes/bookRoutes');

const app = express();
app.use(express.json());
app.use('/books', bookRoutes);

app.listen(3000, () => {
  console.log('Servidor ouvindo a porta 3000');
});
