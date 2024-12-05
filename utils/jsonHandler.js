const fs = require('fs/promises');
const path = require('path');

const filePath = (fileName) => path.join(__dirname, '..', 'data', fileName);

const readJSON = async (fileName) => {
    const file = filePath(fileName);
    try {
        const data = await fs.readFile(file, 'utf-8');
        return JSON.parse(data);
    } catch {
        return [];
    }
};

const writeJSON = async (fileName, content) => {
    const file = filePath(fileName);
    await fs.writeFile(file, JSON.stringify(content, null, 2));
};

module.exports = { readJSON, writeJSON };
