/**
 * Configuración global de Jest para cerrar conexiones después de los tests
 */
const sequelize = require('./src/config/sequelize');

module.exports = async () => {
  // Cerrar la conexión de Sequelize después de todos los tests
  await sequelize.close();
};
