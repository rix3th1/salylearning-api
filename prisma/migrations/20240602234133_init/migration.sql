-- CreateTable
CREATE TABLE `Avatar` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `nom_avatar` VARCHAR(30) NOT NULL,
    `descripcion` VARCHAR(100) NOT NULL,
    `rol` ENUM('DOCENTE', 'ESTUDIANTE') NOT NULL,

    UNIQUE INDEX `Avatar_nom_avatar_key`(`nom_avatar`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AvatarUsuario` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `id_avatar` INTEGER UNSIGNED NULL,
    `id_usuario` INTEGER UNSIGNED NOT NULL,

    UNIQUE INDEX `AvatarUsuario_id_usuario_key`(`id_usuario`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Grado` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `nom_grado` VARCHAR(30) NOT NULL,

    UNIQUE INDEX `Grado_nom_grado_key`(`nom_grado`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `GradoUsuario` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `id_grado` INTEGER UNSIGNED NOT NULL,
    `id_usuario` INTEGER UNSIGNED NOT NULL,

    UNIQUE INDEX `GradoUsuario_id_usuario_key`(`id_usuario`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Libro` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `nom_libro` VARCHAR(100) NOT NULL,
    `num_pag` TINYINT UNSIGNED NOT NULL,
    `autor` VARCHAR(100) NOT NULL,
    `editorial` VARCHAR(50) NOT NULL,
    `fecha_pub` DATETIME NOT NULL,
    `url_info` VARCHAR(255) NOT NULL,
    `id_genero_literario` INTEGER UNSIGNED NOT NULL,
    `cant_leido` INTEGER UNSIGNED NOT NULL DEFAULT 0,
    `imagen_portada` VARCHAR(255) NOT NULL,
    `url_libro` VARCHAR(255) NOT NULL,
    `id_grado` INTEGER UNSIGNED NOT NULL,

    UNIQUE INDEX `Libro_nom_libro_key`(`nom_libro`),
    UNIQUE INDEX `Libro_url_info_key`(`url_info`),
    UNIQUE INDEX `Libro_imagen_portada_key`(`imagen_portada`),
    UNIQUE INDEX `Libro_url_libro_key`(`url_libro`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `GeneroLiterario` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `nom_genero` VARCHAR(30) NOT NULL,
    `descripcion` LONGTEXT NOT NULL,

    UNIQUE INDEX `GeneroLiterario_nom_genero_key`(`nom_genero`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MiLibro` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `id_usuario` INTEGER UNSIGNED NOT NULL,
    `id_libro` INTEGER UNSIGNED NOT NULL,
    `terminado` BOOLEAN NOT NULL,
    `tiempo_lectura` INTEGER UNSIGNED NOT NULL DEFAULT 0,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Pregunta` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `num_pregunta` TINYINT UNSIGNED NOT NULL,
    `pregunta` VARCHAR(200) NOT NULL,
    `resA` VARCHAR(100) NOT NULL,
    `resB` VARCHAR(100) NOT NULL,
    `resC` VARCHAR(100) NOT NULL,
    `resD` VARCHAR(100) NOT NULL,
    `id_libro` INTEGER UNSIGNED NOT NULL,

    UNIQUE INDEX `Pregunta_pregunta_key`(`pregunta`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Cuestionario` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `estado` ENUM('COMPLETADO', 'PENDIENTE', 'NO_LOGRADO') NOT NULL DEFAULT 'PENDIENTE',
    `id_pregunta` INTEGER UNSIGNED NOT NULL,
    `fecha_asignado` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `fecha_entrega` DATETIME NOT NULL,
    `calificacion` DECIMAL(2, 1) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Usuario` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(50) NOT NULL,
    `p_nombre` VARCHAR(30) NOT NULL,
    `s_nombre` VARCHAR(30) NULL,
    `p_apellido` VARCHAR(30) NOT NULL,
    `s_apellido` VARCHAR(30) NULL,
    `edad` INTEGER UNSIGNED NULL,
    `fecha_nacimiento` DATE NULL,
    `ciudad` VARCHAR(50) NULL,
    `email` VARCHAR(100) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `rol` ENUM('DOCENTE', 'ESTUDIANTE') NOT NULL DEFAULT 'ESTUDIANTE',
    `use_avatar` BOOLEAN NOT NULL DEFAULT true,
    `verificado` BOOLEAN NOT NULL DEFAULT false,

    UNIQUE INDEX `Usuario_username_key`(`username`),
    UNIQUE INDEX `Usuario_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Docente` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `id_usuario` INTEGER UNSIGNED NOT NULL,
    `cod_docente` VARCHAR(6) NULL,

    UNIQUE INDEX `Docente_id_usuario_key`(`id_usuario`),
    UNIQUE INDEX `Docente_cod_docente_key`(`cod_docente`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Estudiante` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `id_usuario` INTEGER UNSIGNED NOT NULL,
    `cod_estudiante` VARCHAR(10) NULL,
    `apodo` VARCHAR(30) NULL,

    UNIQUE INDEX `Estudiante_id_usuario_key`(`id_usuario`),
    UNIQUE INDEX `Estudiante_cod_estudiante_key`(`cod_estudiante`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `FotoPerfil` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `id_usuario` INTEGER UNSIGNED NOT NULL,
    `foto` VARCHAR(255) NULL,

    UNIQUE INDEX `FotoPerfil_id_usuario_key`(`id_usuario`),
    UNIQUE INDEX `FotoPerfil_foto_key`(`foto`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Contacto` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `nombre_completo` VARCHAR(60) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `telefono` VARCHAR(10) NOT NULL,
    `mensaje` LONGTEXT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Soporte` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `nombre_completo` VARCHAR(60) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `asunto` MEDIUMTEXT NOT NULL,
    `mensaje` LONGTEXT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `AvatarUsuario` ADD CONSTRAINT `AvatarUsuario_id_usuario_fkey` FOREIGN KEY (`id_usuario`) REFERENCES `Usuario`(`id`) ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `AvatarUsuario` ADD CONSTRAINT `AvatarUsuario_id_avatar_fkey` FOREIGN KEY (`id_avatar`) REFERENCES `Avatar`(`id`) ON DELETE SET NULL ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `GradoUsuario` ADD CONSTRAINT `GradoUsuario_id_usuario_fkey` FOREIGN KEY (`id_usuario`) REFERENCES `Usuario`(`id`) ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `GradoUsuario` ADD CONSTRAINT `GradoUsuario_id_grado_fkey` FOREIGN KEY (`id_grado`) REFERENCES `Grado`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `Libro` ADD CONSTRAINT `Libro_id_genero_literario_fkey` FOREIGN KEY (`id_genero_literario`) REFERENCES `GeneroLiterario`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `Libro` ADD CONSTRAINT `Libro_id_grado_fkey` FOREIGN KEY (`id_grado`) REFERENCES `Grado`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `MiLibro` ADD CONSTRAINT `MiLibro_id_libro_fkey` FOREIGN KEY (`id_libro`) REFERENCES `Libro`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `MiLibro` ADD CONSTRAINT `MiLibro_id_usuario_fkey` FOREIGN KEY (`id_usuario`) REFERENCES `Usuario`(`id`) ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `Pregunta` ADD CONSTRAINT `Pregunta_id_libro_fkey` FOREIGN KEY (`id_libro`) REFERENCES `Libro`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `Cuestionario` ADD CONSTRAINT `Cuestionario_id_pregunta_fkey` FOREIGN KEY (`id_pregunta`) REFERENCES `Pregunta`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `Docente` ADD CONSTRAINT `Docente_id_usuario_fkey` FOREIGN KEY (`id_usuario`) REFERENCES `Usuario`(`id`) ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `Estudiante` ADD CONSTRAINT `Estudiante_id_usuario_fkey` FOREIGN KEY (`id_usuario`) REFERENCES `Usuario`(`id`) ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `FotoPerfil` ADD CONSTRAINT `FotoPerfil_id_usuario_fkey` FOREIGN KEY (`id_usuario`) REFERENCES `Usuario`(`id`) ON DELETE CASCADE ON UPDATE RESTRICT;
