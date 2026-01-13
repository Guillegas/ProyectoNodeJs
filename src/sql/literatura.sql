-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Servidor: db
-- Tiempo de generación: 05-01-2026 a las 13:40:54
-- Versión del servidor: 8.0.43
-- Versión de PHP: 8.2.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `literatura`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `autores`
--

CREATE TABLE `autores` (
  `id_autor` int NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `nacionalidad` varchar(100) DEFAULT NULL,
  `fecha_nacimiento` date DEFAULT NULL,
  `activo` tinyint(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `autores`
--

INSERT INTO `autores` (`id_autor`, `nombre`, `nacionalidad`, `fecha_nacimiento`, `activo`) VALUES
(1, 'Gabriel García Márquez', 'Colombiana', '1927-03-06', 1),
(2, 'Miguel de Cervantes', 'Española', '1547-09-29', 1),
(4, 'Isabel Allende', 'Chilena', '1942-08-02', 1),
(5, 'Mario Vargas Llosa', 'Peruana', '1936-03-28', 1),
(6, 'Federico García Lorca', 'Española', '1898-06-05', 0),
(7, 'Julio Cortázar', 'Argentina', '1914-08-26', 1),
(8, 'Pablo Neruda', 'Chilena', '1904-07-12', 0),
(9, 'Carmen Laforet', 'Española', '1921-09-06', 0),
(10, 'Rosa Montero', 'Española', '1951-01-03', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `libros`
--

CREATE TABLE `libros` (
  `id_libro` int NOT NULL,
  `titulo` varchar(200) NOT NULL,
  `isbn` varchar(13) DEFAULT NULL,
  `editorial` varchar(100) DEFAULT NULL,
  `anyo_publicacion` int DEFAULT NULL,
  `paginas` int DEFAULT NULL,
  `precio` decimal(6,2) DEFAULT NULL,
  `id_autor` int DEFAULT NULL,
  `imagen` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `libros`
--

INSERT INTO `libros` (`id_libro`, `titulo`, `isbn`, `editorial`, `anyo_publicacion`, `paginas`, `precio`, `id_autor`, `imagen`) VALUES
(1, 'Cien años de soledad', '9788437604938', 'Sudamericana', 1967, 471, 22.90, 1, 'https://covers.openlibrary.org/b/isbn/9788437604938-L.jpg'),
(2, 'El amor en los tiempos del cólera', '9788437608097', 'Mondadori', 1985, 348, 19.90, 1, 'https://covers.openlibrary.org/b/isbn/9788437608097-L.jpg'),
(3, 'Don Quijote de la Mancha', '9788467026613', 'Espasa', 1605, 1200, 35.00, 2, 'https://covers.openlibrary.org/b/isbn/9788467026613-L.jpg'),
(4, 'Rayuela', '9788437605812', 'Cátedra', 1963, 634, 24.50, 7, 'https://covers.openlibrary.org/b/isbn/9788437605812-L.jpg'),
(5, 'La casa de los espíritus', '9788401330139', 'Plaza & Janés', 1982, 455, 21.90, 4, 'https://covers.openlibrary.org/b/isbn/9788401330139-L.jpg'),
(6, 'Conversación en la Catedral', '9788490628343', 'Seix Barral', 1969, 712, 28.90, 5, 'https://covers.openlibrary.org/b/isbn/9788490628343-L.jpg'),
(7, 'Bodas de sangre', '9788437619758', 'Cátedra', 1933, 128, 12.50, 6, 'https://covers.openlibrary.org/b/isbn/9788437619758-L.jpg'),
(8, 'Veinte poemas de amor', '9788478444920', 'Cátedra', 1924, 96, 10.90, 8, 'https://covers.openlibrary.org/b/isbn/9788478444920-L.jpg'),
(9, 'Nada', '9788437619529', 'Destino', 1945, 287, 17.50, 9, 'https://covers.openlibrary.org/b/isbn/9788437619529-L.jpg'),
(10, 'La hija del caníbal', '9788433920564', 'Seix Barral', 1997, 320, 20.90, 10, 'https://covers.openlibrary.org/b/isbn/9788433920564-L.jpg');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `autores`
--
ALTER TABLE `autores`
  ADD PRIMARY KEY (`id_autor`);

--
-- Indices de la tabla `libros`
--
ALTER TABLE `libros`
  ADD PRIMARY KEY (`id_libro`),
  ADD UNIQUE KEY `isbn` (`isbn`),
  ADD KEY `idx_autor` (`id_autor`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `autores`
--
ALTER TABLE `autores`
  MODIFY `id_autor` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `libros`
--
ALTER TABLE `libros`
  MODIFY `id_libro` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `libros`
--
ALTER TABLE `libros`
  ADD CONSTRAINT `libros_ibfk_1` FOREIGN KEY (`id_autor`) REFERENCES `autores` (`id_autor`) ON DELETE SET NULL;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
