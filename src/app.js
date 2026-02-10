// ============================================
// IMPORTACIONES
// ============================================
const express = require("express");
const path = require("path");
const cors = require("cors");

// Rutas de la API
const apiRoutes = require("./routes/routes");

// ============================================
// INICIALIZACIÓN
// ============================================
const app = express();

// ============================================
// MIDDLEWARE - PARSEO
// ============================================
app.use(express.json());

// ============================================
// MIDDLEWARE - CORS - Cualquier origen
// ============================================
app.use(cors());

// ============================================
// MIDDLEWARE - ARCHIVOS ESTÁTICOS
// ============================================
app.use(express.static(path.join(__dirname, "public")));

// ============================================
// RUTAS - API REST
// ============================================
app.use("/api", apiRoutes);

// ============================================
// EXPORTAR APP PARA TESTING
// ============================================
module.exports = app;
