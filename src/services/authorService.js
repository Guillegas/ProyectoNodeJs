// services/authorService.js
const { Author } = require("../models/init-models.js");

/**
 * Servicio para la gestión de autores.
 * @class AuthorService
 */
class AuthorService {
  /**
   * Recupera todos los autores.
   * @async
   * @returns {Promise<Array<Object>>} Lista de todos los autores.
   */
  async getAllAuthors() {
    const result = await Author.findAll();
    return result;
  }

  /**
   * Recupera un autor por su ID.
   * @async
   * @param {number} id_autor - ID del autor a recuperar.
   * @returns {Promise<Object|null>} El autor encontrado o null si no existe.
   */
  async getAuthorById(id_autor) {
    const result = await Author.findByPk(id_autor);
    return result;
  }

  /**
   * Crea un nuevo autor.
   * @async
   * @param {Object} author - Objeto con los datos del autor.
   * @returns {Promise<Object>} El autor creado.
   */
  async createAuthor(author) {
    const result = await Author.create(author);
    return result;
  }

  /**
   * Elimina un autor por su ID.
   * @async
   * @param {number} id_autor - ID del autor a eliminar.
   * @returns {Promise<number>} Número de filas eliminadas.
   */
  async deleteAuthor(id_autor) {
    const numFilas = await Author.destroy({
      where: { id_autor: id_autor },
    });
    return numFilas;
  }

  /**
   * Actualiza los datos de un autor existente.
   * @async
   * @param {Object} author - Objeto con los datos actualizados del autor (debe incluir id_autor).
   * @returns {Promise<number>} Número de filas afectadas.
   */
  async updateAuthor(author) {
    let numFilas = await Author.update(author, {
      where: { id_autor: author.id_autor },
    });
    
    // Check if 0 rows modified but record exists (no data change needed)
    if (numFilas == 0 && (await Author.findByPk(author.id_autor))) {
      numFilas = 1;
    }

    return numFilas;
  }

  /**
   * Recupera autores nacidos a partir de un año específico.
   * @async
   * @param {number} minYear - Año de nacimiento mínimo.
   * @returns {Promise<Array<Object>>} Lista de autores que cumplen el criterio.
   */
  async getAuthorsByBirthYear(minYear) {
    const { Op } = require('sequelize');
    const result = await Author.findAll({
      where: {
        fecha_nacimiento: {
          [Op.gte]: `${minYear}-01-01`
        }
      },
      order: [['fecha_nacimiento', 'ASC']]
    });
    return result;
  }
}

module.exports = new AuthorService();
