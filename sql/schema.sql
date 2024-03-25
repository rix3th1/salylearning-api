-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 19-03-2024 a las 22:05:39
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.1.17

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `saly`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `avatar`
--

CREATE TABLE `avatar` (
  `id` int(12) NOT NULL COMMENT 'id de la tabla avatar',
  `nom_avatar` varchar(30) NOT NULL COMMENT 'nombre del avatar'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `avatar_usuario`
--

CREATE TABLE `avatar_usuario` (
  `id` int(12) NOT NULL COMMENT 'id de la tabla avatar_usuario',
  `id_avatar` int(12) NOT NULL COMMENT 'id de la tabla avatar',
  `id_usuario` int(12) NOT NULL COMMENT 'id de la tabla usuario'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `grados`
--

CREATE TABLE `grados` (
  `id` int(12) NOT NULL COMMENT 'id de la tabla grados',
  `nom_grado` varchar(30) NOT NULL COMMENT 'nombre del grado'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `grado_usuario`
--

CREATE TABLE `grado_usuario` (
  `id` int(12) NOT NULL COMMENT 'id de la tabla grado_usuario',
  `id_grado` int(12) NOT NULL COMMENT 'id de la tabla grados',
  `id_usuario` int(12) NOT NULL COMMENT 'id de la tabla usuario'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `libros`
--

CREATE TABLE `libros` (
  `id` int(12) NOT NULL COMMENT 'id de la tabla libros',
  `nom_libro` varchar(100) NOT NULL COMMENT 'nombre del libro',
  `num_pag` tinyint(2) NOT NULL COMMENT 'numero de paginas ',
  `cant_leido` int(5) NOT NULL COMMENT 'cantidad de libros leidos ',
  `id_grado` int(12) NOT NULL COMMENT 'id de la tabla grados'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `mis_libros`
--

CREATE TABLE `mis_libros` (
  `id` int(12) NOT NULL COMMENT 'id de la tabla mis libros',
  `id_usuario` int(12) NOT NULL COMMENT 'id de la tabla usuario',
  `id_libro` int(12) NOT NULL COMMENT 'id de la tabla libros',
  `terminado` tinyint(1) NOT NULL COMMENT 'cantidad de libros terminados'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `preguntas`
--

CREATE TABLE `preguntas` (
  `id` int(12) NOT NULL COMMENT 'id de la tabla preguntas',
  `num_pregunta` tinyint(2) NOT NULL COMMENT 'numero de pregunta',
  `pregunta` varchar(200) NOT NULL COMMENT 'contenido de la pregunta',
  `resA` varchar(100) NOT NULL COMMENT 'respuesta A',
  `resB` varchar(100) NOT NULL COMMENT 'respuesta B',
  `resC` varchar(100) NOT NULL COMMENT 'respuesta C',
  `resD` varchar(100) NOT NULL COMMENT 'respuesta D',
  `id_libro` int(11) NOT NULL COMMENT 'id de la tabla libros'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `id` int(12) NOT NULL COMMENT 'id de la tabla usuario',
  `username` varchar(50) NOT NULL COMMENT 'nombre de usuario',
  `p_nombre` varchar(30) NOT NULL COMMENT 'primer nombre',
  `s_nombre` varchar(30) NOT NULL COMMENT 'segundo nombre',
  `p_apellido` varchar(30) NOT NULL COMMENT 'primer apellido',
  `s_apellido` varchar(30) NOT NULL COMMENT 'segundo apellido',
  `email` varchar(100) NOT NULL COMMENT 'correo electronico',
  `password` varchar(12) NOT NULL COMMENT 'contraseña'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `avatar`
--
ALTER TABLE `avatar`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `avatar_usuario`
--
ALTER TABLE `avatar_usuario`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_avatar` (`id_avatar`),
  ADD KEY `id_usuario` (`id_usuario`);

--
-- Indices de la tabla `grados`
--
ALTER TABLE `grados`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `grado_usuario`
--
ALTER TABLE `grado_usuario`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_grado` (`id_grado`),
  ADD KEY `id_usuario` (`id_usuario`);

--
-- Indices de la tabla `libros`
--
ALTER TABLE `libros`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_grado` (`id_grado`);

--
-- Indices de la tabla `mis_libros`
--
ALTER TABLE `mis_libros`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_usuario` (`id_usuario`),
  ADD KEY `id_libro` (`id_libro`);

--
-- Indices de la tabla `preguntas`
--
ALTER TABLE `preguntas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_libro` (`id_libro`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `avatar`
--
ALTER TABLE `avatar`
  MODIFY `id` int(12) NOT NULL AUTO_INCREMENT COMMENT 'id de la tabla avatar';

--
-- AUTO_INCREMENT de la tabla `avatar_usuario`
--
ALTER TABLE `avatar_usuario`
  MODIFY `id` int(12) NOT NULL AUTO_INCREMENT COMMENT 'id de la tabla avatar_usuario';

--
-- AUTO_INCREMENT de la tabla `grados`
--
ALTER TABLE `grados`
  MODIFY `id` int(12) NOT NULL AUTO_INCREMENT COMMENT 'id de la tabla grados';

--
-- AUTO_INCREMENT de la tabla `grado_usuario`
--
ALTER TABLE `grado_usuario`
  MODIFY `id` int(12) NOT NULL AUTO_INCREMENT COMMENT 'id de la tabla grado_usuario';

--
-- AUTO_INCREMENT de la tabla `libros`
--
ALTER TABLE `libros`
  MODIFY `id` int(12) NOT NULL AUTO_INCREMENT COMMENT 'id de la tabla libros';

--
-- AUTO_INCREMENT de la tabla `mis_libros`
--
ALTER TABLE `mis_libros`
  MODIFY `id` int(12) NOT NULL AUTO_INCREMENT COMMENT 'id de la tabla mis libros';

--
-- AUTO_INCREMENT de la tabla `preguntas`
--
ALTER TABLE `preguntas`
  MODIFY `id` int(12) NOT NULL AUTO_INCREMENT COMMENT 'id de la tabla preguntas';

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id` int(12) NOT NULL AUTO_INCREMENT COMMENT 'id de la tabla usuario';

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `avatar_usuario`
--
ALTER TABLE `avatar_usuario`
  ADD CONSTRAINT `avatar_usuario_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id`),
  ADD CONSTRAINT `avatar_usuario_ibfk_2` FOREIGN KEY (`id_avatar`) REFERENCES `avatar` (`id`);

--
-- Filtros para la tabla `grado_usuario`
--
ALTER TABLE `grado_usuario`
  ADD CONSTRAINT `grado_usuario_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id`),
  ADD CONSTRAINT `grado_usuario_ibfk_2` FOREIGN KEY (`id_grado`) REFERENCES `grados` (`id`);

--
-- Filtros para la tabla `libros`
--
ALTER TABLE `libros`
  ADD CONSTRAINT `libros_ibfk_1` FOREIGN KEY (`id_grado`) REFERENCES `grados` (`id`);

--
-- Filtros para la tabla `mis_libros`
--
ALTER TABLE `mis_libros`
  ADD CONSTRAINT `mis_libros_ibfk_1` FOREIGN KEY (`id_libro`) REFERENCES `libros` (`id`),
  ADD CONSTRAINT `mis_libros_ibfk_2` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id`);

--
-- Filtros para la tabla `preguntas`
--
ALTER TABLE `preguntas`
  ADD CONSTRAINT `preguntas_ibfk_1` FOREIGN KEY (`id_libro`) REFERENCES `libros` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
