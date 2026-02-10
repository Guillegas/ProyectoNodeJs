/**
 * Tests de integración para el endpoint /api/books
 * Utiliza supertest para realizar peticiones HTTP al servidor Express
 */
const request = require('supertest');
const app = require('../app');

// ============================================
// TESTS PARA LIBROS
// ============================================
describe('API de Libros - /api/books', () => {

  // Variable para almacenar el ID del libro creado en los tests
  let createdBookId;

  // ----------------------------------------
  // GET /api/books - Obtener todos los libros
  // ----------------------------------------
  describe('GET /api/books', () => {
    test('debería devolver una lista de libros con status 200', async () => {
      const response = await request(app).get('/api/books');
      
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('ok', true);
      expect(response.body).toHaveProperty('datos');
    });
  });

  // ----------------------------------------
  // POST /api/books - Crear un nuevo libro
  // ----------------------------------------
  describe('POST /api/books', () => {
    test('debería crear un nuevo libro con status 201', async () => {
      const newBook = {
        titulo: 'Libro de Test Jest',
        isbn: `978${Date.now().toString().slice(-10)}`, // ISBN único
        editorial: 'Editorial Test',
        anyo_publicacion: 2024,
        paginas: 250,
        precio: 19.99
      };

      const response = await request(app)
        .post('/api/books')
        .send(newBook);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('ok', true);
      expect(response.body).toHaveProperty('datos');
      expect(response.body.datos).toHaveProperty('id_libro');
      expect(response.body.datos.titulo).toBe(newBook.titulo);

      // Guardar el ID para usarlo en tests posteriores
      createdBookId = response.body.datos.id_libro;
    });

    test('debería fallar al crear libro sin título', async () => {
      const invalidBook = {
        isbn: '9789876543210',
        editorial: 'Editorial Test'
      };

      const response = await request(app)
        .post('/api/books')
        .send(invalidBook);

      expect(response.status).toBeGreaterThanOrEqual(400);
    });
  });

  // ----------------------------------------
  // GET /api/books/:id - Obtener libro por ID
  // ----------------------------------------
  describe('GET /api/books/:id', () => {
    test('debería devolver un libro específico con status 200', async () => {
      const response = await request(app).get(`/api/books/${createdBookId}`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('ok', true);
      expect(response.body).toHaveProperty('datos');
      expect(response.body.datos.id_libro).toBe(createdBookId);
    });

    test('debería devolver 404 para un libro inexistente', async () => {
      const response = await request(app).get('/api/books/99999');

      expect(response.status).toBe(404);
    });
  });

  // ----------------------------------------
  // PUT /api/books/:id - Actualizar libro
  // ----------------------------------------
  describe('PUT /api/books/:id', () => {
    test('debería actualizar un libro con status 204', async () => {
      const updatedData = {
        titulo: 'Libro Actualizado Jest',
        precio: 24.99
      };

      const response = await request(app)
        .put(`/api/books/${createdBookId}`)
        .send(updatedData);

      // La API devuelve 204 No Content en actualizaciones exitosas
      expect(response.status).toBe(204);
    });
  });

  // ----------------------------------------
  // DELETE /api/books/:id - Eliminar libro
  // ----------------------------------------
  describe('DELETE /api/books/:id', () => {
    test('debería eliminar un libro con status 204', async () => {
      const response = await request(app).delete(`/api/books/${createdBookId}`);

      // La API devuelve 204 No Content en eliminaciones exitosas
      expect(response.status).toBe(204);
    });

    test('debería devolver 404 al eliminar libro inexistente', async () => {
      const response = await request(app).delete('/api/books/99999');

      expect(response.status).toBe(404);
    });
  });

  // ----------------------------------------
  // GET /api/books/filter/by-pages - Filtrar por páginas
  // ----------------------------------------
  describe('GET /api/books/filter/by-pages', () => {
    test('debería filtrar libros por número mínimo de páginas', async () => {
      const response = await request(app)
        .get('/api/books/filter/by-pages')
        .query({ minPages: 100 });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('ok', true);
      expect(response.body).toHaveProperty('datos');
      expect(Array.isArray(response.body.datos)).toBe(true);
    });
  });
});
