// ============================================
// IMPORTACIONES
// ============================================
const app = require("./app");
const { logMensaje } = require("./utils/logger.js");

// ============================================
// CONFIGURACIÓN DEL PUERTO
// ============================================
const port = process.env.PORT || 3000;

// ============================================
// SERVIDOR
// ============================================
app.listen(port, () => {
  logMensaje(`Servidor escuchando en el puerto ${port}`);
});
