-- ==========================================
-- SCRIPT DE CREACIÓN DE BASE DE DATOS (DDL)
-- SISTEMA DE GESTIÓN DE LIGA DEPORTIVA
-- ==========================================

CREATE DATABASE IF NOT EXISTS liga_deportiva CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE liga_deportiva;

-- ------------------------------------------
-- 1. TABLA: usuarios
-- Registra los usuarios del sistema (Admin, Planillero)
-- ------------------------------------------
CREATE TABLE IF NOT EXISTS usuarios (
    id_usuario INT AUTO_INCREMENT,
    nombre_usuario VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    rol ENUM('Admin', 'Planillero') NOT NULL,
    estado TINYINT(1) DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id_usuario),
    CONSTRAINT uq_usuario_email UNIQUE (email)
) ENGINE=InnoDB;

-- ------------------------------------------
-- 2. TABLA: equipos
-- Registra los equipos (barrios, empresas, etc.)
-- ------------------------------------------
CREATE TABLE IF NOT EXISTS equipos (
    id_equipo INT AUTO_INCREMENT,
    nombre_equipo VARCHAR(100) NOT NULL,
    representante VARCHAR(100) NOT NULL,
    contacto VARCHAR(50),
    logo_url VARCHAR(255),
    color VARCHAR(7) NOT NULL DEFAULT '#10b981',
    PRIMARY KEY (id_equipo),
    CONSTRAINT uq_nombre_equipo UNIQUE (nombre_equipo)
) ENGINE=InnoDB;

-- ------------------------------------------
-- 3. TABLA: jugadores
-- Registra los jugadores de la liga deportiva
-- ------------------------------------------
CREATE TABLE IF NOT EXISTS jugadores (
    id_jugador INT AUTO_INCREMENT,
    documento_identidad VARCHAR(20) NOT NULL,
    nombre VARCHAR(50) NOT NULL,
    apellido VARCHAR(50) NOT NULL,
    fecha_nacimiento DATE NOT NULL,
    telefono VARCHAR(20),
    posicion ENUM('Portero', 'Defensa', 'Mediocampista', 'Delantero') NOT NULL DEFAULT 'Mediocampista',
    PRIMARY KEY (id_jugador),
    CONSTRAINT uq_jugador_documento UNIQUE (documento_identidad)
) ENGINE=InnoDB;

-- ------------------------------------------
-- 4. TABLA: sedes
-- Registra las sedes deportivas (canchas o predios)
-- ------------------------------------------
CREATE TABLE IF NOT EXISTS sedes (
    id_sede INT AUTO_INCREMENT,
    nombre_sede VARCHAR(100) NOT NULL,
    direccion VARCHAR(150) NOT NULL,
    capacidad INT NOT NULL,
    PRIMARY KEY (id_sede),
    CONSTRAINT uq_nombre_sede UNIQUE (nombre_sede),
    CONSTRAINT chk_sede_capacidad CHECK (capacidad >= 0)
) ENGINE=InnoDB;

-- ------------------------------------------
-- 5. TABLA: torneos
-- Registra las ediciones de campeonatos deportivos
-- ------------------------------------------
CREATE TABLE IF NOT EXISTS torneos (
    id_torneo INT AUTO_INCREMENT,
    nombre_torneo VARCHAR(100) NOT NULL,
    fecha_inicio DATE NOT NULL,
    fecha_fin DATE NOT NULL,
    estado ENUM('Borrador', 'Activo', 'Finalizado') DEFAULT 'Borrador',
    PRIMARY KEY (id_torneo),
    CONSTRAINT uq_nombre_torneo UNIQUE (nombre_torneo),
    CONSTRAINT chk_torneo_fechas CHECK (fecha_fin >= fecha_inicio)
) ENGINE=InnoDB;

-- ------------------------------------------
-- 6. TABLA ASOCIATIVA: equipos_torneo
-- Inscripción de equipos en un torneo específico
-- ------------------------------------------
CREATE TABLE IF NOT EXISTS equipos_torneo (
    id_torneo INT NOT NULL,
    id_equipo INT NOT NULL,
    fecha_inscripcion DATE DEFAULT (CURRENT_DATE),
    PRIMARY KEY (id_torneo, id_equipo),
    CONSTRAINT fk_eqtor_torneo FOREIGN KEY (id_torneo) REFERENCES torneos (id_torneo) ON DELETE CASCADE,
    CONSTRAINT fk_eqtor_equipo FOREIGN KEY (id_equipo) REFERENCES equipos (id_equipo) ON DELETE CASCADE
) ENGINE=InnoDB;

-- ------------------------------------------
-- 7. TABLA ASOCIATIVA: inscripciones_jugadores
-- Inscripción de jugadores en un equipo para un torneo específico
-- En cumplimiento estricto con las Reglas de Negocio 3 y 6:
--   Regla 3: Un jugador no puede pertenecer a dos equipos diferentes en el mismo torneo.
--   Regla 6: Un jugador no puede estar inscrito dos veces en el mismo equipo para el mismo torneo.
--   -> Ambas se solucionan con la clave UNIQUE compuesta (id_jugador, id_torneo).
-- ------------------------------------------
CREATE TABLE IF NOT EXISTS inscripciones_jugadores (
    id_inscripcion INT AUTO_INCREMENT,
    id_jugador INT NOT NULL,
    id_torneo INT NOT NULL,
    id_equipo INT NOT NULL,
    fecha_registro DATE DEFAULT (CURRENT_DATE),
    PRIMARY KEY (id_inscripcion),
    CONSTRAINT fk_insjug_jugador FOREIGN KEY (id_jugador) REFERENCES jugadores (id_jugador) ON DELETE CASCADE,
    CONSTRAINT fk_insjug_eqtor FOREIGN KEY (id_torneo, id_equipo) REFERENCES equipos_torneo (id_torneo, id_equipo) ON DELETE CASCADE,
    CONSTRAINT uq_jugador_torneo UNIQUE (id_jugador, id_torneo)
) ENGINE=InnoDB;

-- ------------------------------------------
-- 8. TABLA: partidos
-- Programación y marcadores de partidos de la liga
-- En cumplimiento con la Regla de Negocio 1:
--   Regla 1: No se pueden programar dos partidos en la misma sede el mismo día y hora.
--   -> Se soluciona con el índice UNIQUE (id_sede, fecha, hora).
-- ------------------------------------------
CREATE TABLE IF NOT EXISTS partidos (
    id_partido INT AUTO_INCREMENT,
    id_torneo INT NOT NULL,
    id_equipo_local INT NOT NULL,
    id_equipo_visitante INT NOT NULL,
    id_sede INT NOT NULL,
    fecha DATE NOT NULL,
    hora TIME NOT NULL,
    goles_local INT DEFAULT NULL,
    goles_visitante INT DEFAULT NULL,
    estado ENUM('Programado', 'En Juego', 'Finalizado', 'Cancelado') DEFAULT 'Programado',
    PRIMARY KEY (id_partido),
    CONSTRAINT fk_partido_torneo FOREIGN KEY (id_torneo) REFERENCES torneos (id_torneo),
    CONSTRAINT fk_partido_local FOREIGN KEY (id_equipo_local) REFERENCES equipos (id_equipo),
    CONSTRAINT fk_partido_visitante FOREIGN KEY (id_equipo_visitante) REFERENCES equipos (id_equipo),
    CONSTRAINT fk_partido_sede FOREIGN KEY (id_sede) REFERENCES sedes (id_sede),
    CONSTRAINT uq_sede_horario UNIQUE (id_sede, fecha, hora),
    CONSTRAINT chk_partido_equipos CHECK (id_equipo_local <> id_equipo_visitante),
    CONSTRAINT chk_goles_local CHECK (goles_local >= 0 OR goles_local IS NULL),
    CONSTRAINT chk_goles_visitante CHECK (goles_visitante >= 0 OR goles_visitante IS NULL)
) ENGINE=InnoDB;

-- ==========================================
-- ÍNDICES RECOMENDADOS PARA RENDIMIENTO
-- ==========================================
CREATE INDEX idx_partidos_fecha_hora ON partidos(fecha, hora);
CREATE INDEX idx_partidos_equipos ON partidos(id_equipo_local, id_equipo_visitante);
CREATE INDEX idx_inscripciones_jugador ON inscripciones_jugadores(id_jugador);

-- ==========================================
-- DISPARADORES (TRIGGERS) PARA REGLAS DE NEGOCIO COMPLEJAS
-- ==========================================

DELIMITER $$

-- ------------------------------------------
-- Regla de Negocio 2:
-- Un equipo no puede jugar dos partidos el mismo día dentro del mismo torneo.
-- ------------------------------------------
CREATE TRIGGER tg_chk_equipo_disponibilidad_insert
BEFORE INSERT ON partidos
FOR EACH ROW
BEGIN
    DECLARE partidos_local_dia INT DEFAULT 0;
    DECLARE partidos_visitante_dia INT DEFAULT 0;

    -- Verificar para el equipo local
    SELECT COUNT(*) INTO partidos_local_dia
    FROM partidos
    WHERE id_torneo = NEW.id_torneo
      AND fecha = NEW.fecha
      AND (id_equipo_local = NEW.id_equipo_local OR id_equipo_visitante = NEW.id_equipo_local);

    IF partidos_local_dia > 0 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Error de Negocio: El equipo local ya tiene programado un partido este mismo día en este torneo.';
    END IF;

    -- Verificar para el equipo visitante
    SELECT COUNT(*) INTO partidos_visitante_dia
    FROM partidos
    WHERE id_torneo = NEW.id_torneo
      AND fecha = NEW.fecha
      AND (id_equipo_local = NEW.id_equipo_visitante OR id_equipo_visitante = NEW.id_equipo_visitante);

    IF partidos_visitante_dia > 0 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Error de Negocio: El equipo visitante ya tiene programado un partido este mismo día en este torneo.';
    END IF;
END$$

-- ------------------------------------------
-- Regla de Negocio 5:
-- Un torneo debe tener al menos dos equipos inscritos antes de programar partidos.
-- ------------------------------------------
CREATE TRIGGER tg_chk_minimo_equipos_insert
BEFORE INSERT ON partidos
FOR EACH ROW
BEGIN
    DECLARE cant_equipos INT DEFAULT 0;

    SELECT COUNT(*) INTO cant_equipos
    FROM equipos_torneo
    WHERE id_torneo = NEW.id_torneo;

    IF cant_equipos < 2 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Error de Negocio: El torneo debe contar con al menos dos equipos inscritos antes de programar partidos.';
    END IF;
END$$

-- ------------------------------------------
-- Regla de Negocio 4:
-- Solo se pueden registrar resultados de partidos programados o en juego.
-- ------------------------------------------
CREATE TRIGGER tg_chk_registro_marcador_update
BEFORE UPDATE ON partidos
FOR EACH ROW
BEGIN
    -- Si se están intentando modificar los goles
    IF (NEW.goles_local IS NOT NULL AND OLD.goles_local IS NULL) OR 
       (NEW.goles_visitante IS NOT NULL AND OLD.goles_visitante IS NULL) OR
       (NEW.goles_local <> OLD.goles_local) OR
       (NEW.goles_visitante <> OLD.goles_visitante) THEN
        
        -- Si el estado actual del partido antes de actualizar es "Cancelado" o no permite cambios
        IF OLD.estado = 'Cancelado' THEN
            SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'Error de Negocio: No se pueden registrar o modificar resultados de un partido Cancelado.';
        END IF;

        -- Forzar cambio de estado a Finalizado si ya se registraron los goles
        IF NEW.estado = 'Programado' THEN
            SET NEW.estado = 'Finalizado';
        END IF;
    END IF;
END$$

DELIMITER ;
