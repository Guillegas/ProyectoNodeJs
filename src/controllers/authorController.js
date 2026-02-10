const { logMensaje } = require("../utils/logger.js");
const authorService = require("../services/authorService");

/**
 * Controlador para la gestión de autores.
 * @class AuthorController
 */
class AuthorController {
  /**
   * Recupera la lista de todos los autores.
   * @async
   * @param {Object} req - Objeto de solicitud Express.
   * @param {Object} res - Objeto de respuesta Express.
   * @returns {Promise<Object>} Respuesta JSON con los autores y mensaje de éxito o error.
   */
  async getAllAuthors(req, res) {
    try {
      const authors = await authorService.getAllAuthors();
      return res.status(200).json({
        ok: true,
        datos: authors,
        mensaje: "Autores recuperados correctamente",
      });
    } catch (err) {
      logMensaje("Error en getAllAuthors:", err);
      return res.status(500).json({
        ok: false,
        datos: null,
        mensaje: "Error al recuperar autores",
      });
    }
  }

  /**
   * Crea un nuevo autor.
   * @async
   * @param {Object} req - Objeto de solicitud Express (con los datos del autor en body).
   * @param {Object} res - Objeto de respuesta Express.
   * @returns {Promise<Object>} Respuesta JSON con el autor creado.
   */
  async createAuthor(req, res) {
    const author = req.body;

    try {
      const authorNew = await authorService.createAuthor(author);

      return res.status(201).json({
        ok: true,
        datos: authorNew,
        mensaje: "Autor creado correctamente",
      });
    } catch (err) {
      logMensaje("Error en createAuthor:", err);
      return res.status(500).json({
        ok: false,
        datos: null,
        mensaje: "Error al crear un autor",
      });
    }
  }

  /**
   * Elimina un autor.
   * @async
   * @param {Object} req - Objeto de solicitud Express (con id en params).
   * @param {Object} res - Objeto de respuesta Express.
   * @returns {Promise<Object>} Respuesta sin contenido (204) o error.
   */
  async deleteAuthor(req, res) {
    const id_autor = req.params.id;

    try {
      const numFilas = await authorService.deleteAuthor(id_autor);

      if (numFilas == 0) {
        return res.status(404).json({
          ok: false,
          datos: null,
          mensaje: "Autor no encontrado: " + id_autor,
        });
      } else {
        return res.status(204).send();
      }
    } catch (err) {
      logMensaje("Error en deleteAuthor:", err);
      return res.status(500).json({
        ok: false,
        datos: null,
        mensaje: "Error al borrar un autor",
      });
    }
  }

  /**
   * Actualiza un autor existente.
   * @async
   * @param {Object} req - Objeto de solicitud Express (con id en params y datos en body).
   * @param {Object} res - Objeto de respuesta Express.
   * @returns {Promise<Object>} Respuesta sin contenido (204) o error.
   */
  async updateAuthor(req, res) {
    const id_autor = req.params.id;
    const author = req.body;
    author.id_autor = id_autor; 

    try {
      const numFilas = await authorService.updateAuthor(author);

      if (numFilas == 0) {
        return res.status(404).json({
          ok: false,
          datos: null,
          mensaje: "No encontrado: " + id_autor,
        });
      } else {
        res.status(204).send();
      }
    } catch (err) {
      logMensaje("Error en updateAuthor:", err);
      return res.status(500).json({
        ok: false,
        datos: null,
        mensaje: "Error al editar un autor",
      });
    }
  }

  /**
   * Recupera un autor por su ID.
   * @async
   * @param {Object} req - Objeto de solicitud Express (con id en params).
   * @param {Object} res - Objeto de respuesta Express.
   * @returns {Promise<Object>} Respuesta JSON con el autor encontrado.
   */
  async getAuthorById(req, res) {
    const id_autor = req.params.id;
    try {
      const author = await authorService.getAuthorById(id_autor);
      if (author) {
        return res.status(200).json({
          ok: true,
          datos: author,
          mensaje: "Autor recuperado correctamente",
        });
      } else {
        return res.status(404).json({
          ok: false,
          datos: null,
          mensaje: "Autor no encontrado",
        });
      }
    } catch (err) {
      logMensaje("Error en getAuthorById:", err);
      return res.status(500).json({
        ok: false,
        datos: null,
        mensaje: "Error al recuperar un autor",
      });
    }
  }

  /**
   * Recupera autores filtrados por año de nacimiento.
   * @async
   * @param {Object} req - Objeto de solicitud Express (con minYear en query).
   * @param {Object} res - Objeto de respuesta Express.
   * @returns {Promise<Object>} Respuesta JSON con los autores filtrados.
   */
  async getAuthorsByBirthYear(req, res) {
    const minYear = req.query.minYear;
    
    if (!minYear) {
      return res.status(400).json({
        ok: false,
        datos: null,
        mensaje: "El parámetro minYear es requerido",
      });
    }

    try {
      const authors = await authorService.getAuthorsByBirthYear(minYear);
      return res.status(200).json({
        ok: true,
        datos: authors,
        mensaje: "Autores filtrados por año de nacimiento",
      });
    } catch (err) {
      logMensaje("Error en getAuthorsByBirthYear:", err);
      return res.status(500).json({
        ok: false,
        datos: null,
        mensaje: "Error al filtrar autores",
      });
    }
  }
}

module.exports = new AuthorController();
