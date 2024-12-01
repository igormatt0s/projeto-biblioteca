const fs = require('fs/promises');
const path = require('path');

const filePath = (fileName) => path.join(__dirname, `../data/${fileName}.json`);

exports.readFile = async (fileName) => {
  try {
    const data = await fs.readFile(filePath(fileName), 'utf8');

    if (!data.trim()) {
        return [];
    }
    
    return JSON.parse(data);
  } catch (err) {
    throw new Error(`Erro ao ler arquivo ${fileName}: ${err.message}`);
  }
};

exports.writeFile = async (fileName, data) => {
  try {
    await fs.writeFile(filePath(fileName), JSON.stringify(data, null, 2));
  } catch (err) {
    throw new Error(`Erro ao escrever no arquivo ${fileName}: ${err.message}`);
  }
};
