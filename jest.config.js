/** @type {import('jest').Config} */
module.exports = {
  // Entorno de ejecución para Node.js
  testEnvironment: 'node',
  
  // Directorio donde buscar los tests
  testMatch: ['**/tests/**/*.test.js'],
  
  // Timeout más largo para tests de integración con BD
  testTimeout: 10000,
  
  // Ejecutar tests en orden (útil para APIs)
  maxWorkers: 1,
  
  // Mostrar información detallada
  verbose: true,
  
  // Forzar salida después de los tests (evita warning de handles abiertos)
  forceExit: true,
  
  // Cerrar conexiones después de todos los tests
  globalTeardown: './jest.teardown.js'
};
