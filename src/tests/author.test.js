/**
 * Tests de integración para el endpoint /api/authors
 * Utiliza supertest para realizar peticiones HTTP al servidor Express
 */
const request = require('supertest');
const app = require('../app');

// ============================================
// TESTS PARA AUTORES
// ============================================
describe('API de Autores - /api/authors', () => {

  // Variable para almacenar el ID del autor creado en los tests
  let createdAuthorId;

  // ----------------------------------------
  // GET /api/authors - Obtener todos los autores
  // ----------------------------------------
  describe('GET /api/authors', () => {
    test('debería devolver una lista de autores con status 200', async () => {
      const response = await request(app).get('/api/authors');
      
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('ok', true);
      expect(response.body).toHaveProperty('datos');
      expect(Array.isArray(response.body.datos)).toBe(true);
    });
  });

  // ----------------------------------------
  // POST /api/authors - Crear un nuevo autor
  // ----------------------------------------
  describe('POST /api/authors', () => {
    test('debería crear un nuevo autor con status 201', async () => {
      const newAuthor = {
        nombre: 'Autor de Test Jest',
        nacionalidad: 'España',
        fecha_nacimiento: '1985-05-15',
        activo: true
      };

      const response = await request(app)
        .post('/api/authors')
        .send(newAuthor);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('ok', true);
      expect(response.body).toHaveProperty('datos');
      expect(response.body.datos).toHaveProperty('id_autor');
      expect(response.body.datos.nombre).toBe(newAuthor.nombre);

      // Guardar el ID para usarlo en tests posteriores
      createdAuthorId = response.body.datos.id_autor;
    });

    test('debería fallar al crear autor sin nombre', async () => {
      const invalidAuthor = {
        nacionalidad: 'España'
      };

      const response = await request(app)
        .post('/api/authors')
        .send(invalidAuthor);

      expect(response.status).toBeGreaterThanOrEqual(400);
    });
  });

  // ----------------------------------------
  // GET /api/authors/:id - Obtener autor por ID
  // ----------------------------------------
  describe('GET /api/authors/:id', () => {
    test('debería devolver un autor específico con status 200', async () => {
      const response = await request(app).get(`/api/authors/${createdAuthorId}`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('ok', true);
      expect(response.body).toHaveProperty('datos');
      expect(response.body.datos.id_autor).toBe(createdAuthorId);
    });

    test('debería devolver 404 para un autor inexistente', async () => {
      const response = await request(app).get('/api/authors/99999');

      expect(response.status).toBe(404);
    });
  });

  // ----------------------------------------
  // PUT /api/authors/:id - Actualizar autor
  // ----------------------------------------
  describe('PUT /api/authors/:id', () => {
    test('debería actualizar un autor con status 204', async () => {
      const updatedData = {
        nombre: 'Autor Actualizado Jest',
        nacionalidad: 'México'
      };

      const response = await request(app)
        .put(`/api/authors/${createdAuthorId}`)
        .send(updatedData);

      // La API devuelve 204 No Content en actualizaciones exitosas
      expect(response.status).toBe(204);
    });
  });

  // ----------------------------------------
  // DELETE /api/authors/:id - Eliminar autor
  // ----------------------------------------
  describe('DELETE /api/authors/:id', () => {
    test('debería eliminar un autor con status 204', async () => {
      const response = await request(app).delete(`/api/authors/${createdAuthorId}`);

      // La API devuelve 204 No Content en eliminaciones exitosas
      expect(response.status).toBe(204);
    });

    test('debería devolver 404 al eliminar autor inexistente', async () => {
      const response = await request(app).delete('/api/authors/99999');

      expect(response.status).toBe(404);
    });
  });

  // ----------------------------------------
  // GET /api/authors/filter/by-birth-year - Filtrar por año
  // ----------------------------------------
  describe('GET /api/authors/filter/by-birth-year', () => {
    test('debería filtrar autores por año de nacimiento', async () => {
      const response = await request(app)
        .get('/api/authors/filter/by-birth-year')
        .query({ minYear: 1980 });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('ok', true);
      expect(response.body).toHaveProperty('datos');
      expect(Array.isArray(response.body.datos)).toBe(true);
    });
  });
});
