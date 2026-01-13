const sequelize = require('../config/sequelize');
const Author = require('./author');
const Book = require('./book');

// Sync Database (Desactivado en producción, útil en dev)
// sequelize.sync({ alter: true }).then(() => console.log('DB Synced'));

module.exports = {
    sequelize,
    Author,
    Book
};
