-- ==========================================
-- SCRIPT DE INSERCIÓN DE DATOS DE PRUEBA (DML)
-- SISTEMA DE GESTIÓN DE LIGA DEPORTIVA
-- ==========================================

USE liga_deportiva;

-- ------------------------------------------
-- 1. INSERCIÓN DE USUARIOS (10 Usuarios)
-- Contraseñas encriptadas ficticias (bcrypt hashes)
-- ------------------------------------------
INSERT INTO usuarios (nombre_usuario, email, password_hash, rol, estado) VALUES
('carlos_admin', 'carlos.admin@liga.com', '$2b$10$EPY9.jQj2mpxJ8qB1U9WXe5w70Z7GjA5zP/5i2H6V2T6B8W4L2m8G', 'Admin', 1),
('ana_planillero', 'ana.planillero@liga.com', '$2b$10$EPY9.jQj2mpxJ8qB1U9WXe5w70Z7GjA5zP/5i2H6V2T6B8W4L2m8G', 'Planillero', 1),
('juan_planilla', 'juan.planilla@liga.com', '$2b$10$EPY9.jQj2mpxJ8qB1U9WXe5w70Z7GjA5zP/5i2H6V2T6B8W4L2m8G', 'Planillero', 1),
('marta_admin', 'marta.admin@liga.com', '$2b$10$EPY9.jQj2mpxJ8qB1U9WXe5w70Z7GjA5zP/5i2H6V2T6B8W4L2m8G', 'Admin', 1),
('luis_planillero', 'luis.planillero@liga.com', '$2b$10$EPY9.jQj2mpxJ8qB1U9WXe5w70Z7GjA5zP/5i2H6V2T6B8W4L2m8G', 'Planillero', 1),
('sofia_admin', 'sofia.admin@liga.com', '$2b$10$EPY9.jQj2mpxJ8qB1U9WXe5w70Z7GjA5zP/5i2H6V2T6B8W4L2m8G', 'Admin', 1),
('pedro_planillero', 'pedro.planillero@liga.com', '$2b$10$EPY9.jQj2mpxJ8qB1U9WXe5w70Z7GjA5zP/5i2H6V2T6B8W4L2m8G', 'Planillero', 1),
('elena_planilla', 'elena.planilla@liga.com', '$2b$10$EPY9.jQj2mpxJ8qB1U9WXe5w70Z7GjA5zP/5i2H6V2T6B8W4L2m8G', 'Planillero', 0), -- Inactivo
('jorge_admin', 'jorge.admin@liga.com', '$2b$10$EPY9.jQj2mpxJ8qB1U9WXe5w70Z7GjA5zP/5i2H6V2T6B8W4L2m8G', 'Admin', 1),
('lucia_planillero', 'lucia.planillero@liga.com', '$2b$10$EPY9.jQj2mpxJ8qB1U9WXe5w70Z7GjA5zP/5i2H6V2T6B8W4L2m8G', 'Planillero', 1);

-- ------------------------------------------
-- 2. INSERCIÓN DE EQUIPOS (10 Equipos)
-- ------------------------------------------
INSERT INTO equipos (nombre_equipo, representante, contacto, logo_url, color) VALUES
('Deportivo Barrio Sur', 'Juan Pérez', '3001234567', '/public/uploads/logos/barrio_sur.png', '#3b82f6'),
('Los Pinos F.C.', 'Andrés Gómez', '3019876543', '/public/uploads/logos/los_pinos.png', '#10b981'),
('Empresa Central S.A.', 'Marta Rincón', '3104567890', '/public/uploads/logos/central_sa.png', '#f59e0b'),
('Real Arrabal', 'Esteban Quito', '3157891234', '/public/uploads/logos/arrabal.png', '#ef4444'),
('Talleres Mecánicos FC', 'Roberto Flores', '3203456789', '/public/uploads/logos/talleres.png', '#8b5cf6'),
('Atlético Industrias', 'Diana Salazar', '3129874561', '/public/uploads/logos/industrias.png', '#ec4899'),
('Unión San José', 'Gabriel Castillo', '3176543210', '/public/uploads/logos/sanjose.png', '#06b6d4'),
('La Rivera F.C.', 'Clara Beltrán', '3183216549', '/public/uploads/logos/rivera.png', '#f43f5e'),
('Comercial del Valle', 'Diego Torres', '3114561239', '/public/uploads/logos/delvalle.png', '#14b8a6'),
('Estrella del Norte', 'Patricia Rojas', '3147894562', '/public/uploads/logos/estrellanorte.png', '#eab308');

-- ------------------------------------------
-- 3. INSERCIÓN DE JUGADORES (30 Jugadores)
-- ------------------------------------------
INSERT INTO jugadores (documento_identidad, nombre, apellido, fecha_nacimiento, telefono, posicion) VALUES
('1001001', 'Mateo', 'Díaz', '1995-04-12', '3002001001', 'Defensa'),
('1001002', 'Lucas', 'Silva', '1996-08-22', '3002001002', 'Mediocampista'),
('1001003', 'Santiago', 'Rojas', '1994-01-15', '3002001003', 'Delantero'),
('1001004', 'Sebastián', 'Castro', '1997-11-30', '3002001004', 'Portero'),
('1001005', 'Daniel', 'Mendoza', '1993-06-05', '3002001005', 'Defensa'),
('1001006', 'Samuel', 'Mejía', '1998-03-25', '3002001006', 'Mediocampista'),
('1001007', 'Nicolás', 'Giraldo', '1999-07-19', '3002001007', 'Delantero'),
('1001008', 'Alejandro', 'Herrera', '1995-10-09', '3002001008', 'Portero'),
('1001009', 'Martín', 'Gómez', '1996-05-14', '3002001009', 'Defensa'),
('1001010', 'Diego', 'Rodríguez', '1994-12-02', '3002001010', 'Mediocampista'),
('1001011', 'David', 'Sánchez', '1997-09-11', '3002001011', 'Delantero'),
('1001012', 'Felipe', 'Martínez', '1993-02-28', '3002001012', 'Portero'),
('1001013', 'Tomas', 'Pérez', '1998-08-16', '3002001013', 'Defensa'),
('1001014', 'Juan', 'García', '1999-12-25', '3002001014', 'Mediocampista'),
('1001015', 'Camilo', 'López', '1995-03-03', '3002001015', 'Delantero'),
('1001016', 'Andrés', 'González', '1996-07-07', '3002001016', 'Portero'),
('1001017', 'Julián', 'Cardona', '1994-05-20', '3002001017', 'Defensa'),
('1001018', 'Jerónimo', 'Marín', '1997-10-10', '3002001018', 'Mediocampista'),
('1001019', 'Emilio', 'Ramírez', '1993-04-04', '3002001019', 'Delantero'),
('1001020', 'Matías', 'Muñoz', '1998-11-23', '3002001020', 'Portero'),
('1001021', 'Leonardo', 'Vargas', '1992-09-08', '3002001021', 'Defensa'),
('1001022', 'Manuel', 'Álvarez', '1995-01-29', '3002001022', 'Mediocampista'),
('1001023', 'Esteban', 'Moreno', '1996-06-17', '3002001023', 'Delantero'),
('1001024', 'Cristian', 'Ortiz', '1997-03-13', '3002001024', 'Portero'),
('1001025', 'Hugo', 'Guerrero', '1994-08-08', '3002001025', 'Defensa'),
('1001026', 'Carlos', 'Ríos', '1999-02-02', '3002001026', 'Mediocampista'),
('1001027', 'Ricardo', 'Franco', '1995-12-12', '3002001027', 'Delantero'),
('1001028', 'Gabriel', 'Bermúdez', '1996-04-30', '3002001028', 'Portero'),
('1001029', 'Álvaro', 'Acosta', '1993-10-24', '3002001029', 'Defensa'),
('1001030', 'Enrique', 'Benítez', '1998-05-18', '3002001030', 'Mediocampista');

-- ------------------------------------------
-- 4. INSERCIÓN DE SEDES (5 Sedes)
-- ------------------------------------------
INSERT INTO sedes (nombre_sede, direccion, capacidad) VALUES
('Polideportivo Municipal Cancha 1', 'Av. del Deporte 123', 500),
('Cancha del Barrio Los Pinos', 'Calle 45 # 12-34', 200),
('Complejo Deportivo La Rivera', 'Carrera 7 # 88-10', 800),
('Cancha Sintética Municipal', 'Calle 5 # 22-11', 150),
('Estadio Municipal de la Comuna', 'Av. de los Fundadores S/N', 3000);

-- ------------------------------------------
-- 5. INSERCIÓN DE TORNEOS (3 Torneos)
-- ------------------------------------------
INSERT INTO torneos (nombre_torneo, fecha_inicio, fecha_fin, estado) VALUES
('Torneo Apertura Liga Municipal 2026', '2026-03-01', '2026-06-30', 'Activo'),
('Torneo Interempresas Municipal 2026', '2026-07-15', '2026-10-31', 'Borrador'),
('Torneo Relámpago Comunas 2026', '2026-11-01', '2026-12-20', 'Borrador');

-- ------------------------------------------
-- 6. INSCRIBIR EQUIPOS EN EL TORNEO 1 (Apertura)
-- Se inscriben 6 equipos para poder programar partidos (Mínimo requerido es 2)
-- ------------------------------------------
INSERT INTO equipos_torneo (id_torneo, id_equipo) VALUES
(1, 1), -- Deportivo Barrio Sur
(1, 2), -- Los Pinos F.C.
(1, 3), -- Empresa Central S.A.
(1, 4), -- Real Arrabal
(1, 5), -- Talleres Mecánicos FC
(1, 6); -- Atlético Industrias

-- ------------------------------------------
-- 7. REGISTRO DE JUGADORES EN EQUIPOS POR TORNEO (20 Inscripciones)
-- Jugadores en Torneo 1 (Apertura) distribuidos en los equipos inscritos
-- ------------------------------------------
INSERT INTO inscripciones_jugadores (id_jugador, id_torneo, id_equipo) VALUES
-- Deportivo Barrio Sur (id_equipo 1)
(1, 1, 1),
(2, 1, 1),
(3, 1, 1),
(4, 1, 1),
-- Los Pinos F.C. (id_equipo 2)
(5, 1, 2),
(6, 1, 2),
(7, 1, 2),
(8, 1, 2),
-- Empresa Central S.A. (id_equipo 3)
(9, 1, 3),
(10, 1, 3),
(11, 1, 3),
-- Real Arrabal (id_equipo 4)
(12, 1, 4),
(13, 1, 4),
(14, 1, 4),
-- Talleres Mecánicos FC (id_equipo 5)
(15, 1, 5),
(16, 1, 5),
(17, 1, 5),
-- Atlético Industrias (id_equipo 6)
(18, 1, 6),
(19, 1, 6),
(20, 1, 6);

-- ------------------------------------------
-- 8. INSERCIÓN DE PARTIDOS (10 Partidos)
-- 10 partidos programados/finalizados para el Torneo 1 (Apertura)
-- ------------------------------------------
INSERT INTO partidos (id_torneo, id_equipo_local, id_equipo_visitante, id_sede, fecha, hora, goles_local, goles_visitante, estado) VALUES
-- Fecha 1
(1, 1, 2, 1, '2026-06-01', '14:00:00', 3, 1, 'Finalizado'),
(1, 3, 4, 2, '2026-06-01', '16:00:00', 2, 2, 'Finalizado'),
(1, 5, 6, 3, '2026-06-02', '14:00:00', 0, 2, 'Finalizado'),
-- Fecha 2
(1, 2, 3, 1, '2026-06-08', '14:00:00', 1, 2, 'Finalizado'),
(1, 4, 5, 4, '2026-06-08', '16:00:00', 4, 1, 'Finalizado'),
(1, 6, 1, 5, '2026-06-09', '14:00:00', 2, 2, 'Finalizado'),
-- Fecha 3 (Programados o en Juego)
(1, 1, 3, 1, '2026-06-15', '14:00:00', NULL, NULL, 'Programado'),
(1, 2, 5, 2, '2026-06-15', '16:00:00', NULL, NULL, 'Programado'),
(1, 4, 6, 3, '2026-06-16', '14:00:00', NULL, NULL, 'Programado'),
-- Fecha 4 (Sede 5)
(1, 3, 5, 5, '2026-06-22', '15:00:00', NULL, NULL, 'Programado');
