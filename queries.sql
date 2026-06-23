-- ==========================================
-- CONSULTAS SQL REQUERIDAS (DQL)
-- SISTEMA DE GESTIÓN DE LIGA DEPORTIVA
-- ==========================================

USE liga_deportiva;

-- ------------------------------------------
-- 1. Mostrar partidos con nombre de equipos y sede
-- ------------------------------------------
SELECT 
    p.id_partido,
    t.nombre_torneo AS torneo,
    el.nombre_equipo AS equipo_local,
    ev.nombre_equipo AS equipo_visitante,
    s.nombre_sede AS sede,
    p.fecha,
    p.hora,
    COALESCE(p.goles_local, '-') AS goles_local,
    COALESCE(p.goles_visitante, '-') AS goles_visitante,
    p.estado
FROM partidos p
JOIN torneos t ON p.id_torneo = t.id_torneo
JOIN equipos el ON p.id_equipo_local = el.id_equipo
JOIN equipos ev ON p.id_equipo_visitante = ev.id_equipo
JOIN sedes s ON p.id_sede = s.id_sede
ORDER BY p.fecha ASC, p.hora ASC;

-- ------------------------------------------
-- 2. Buscar partidos por torneo (ej. Torneo 1)
-- ------------------------------------------
SELECT 
    p.id_partido,
    el.nombre_equipo AS equipo_local,
    ev.nombre_equipo AS equipo_visitante,
    s.nombre_sede AS sede,
    p.fecha,
    p.hora,
    p.estado
FROM partidos p
JOIN equipos el ON p.id_equipo_local = el.id_equipo
JOIN equipos ev ON p.id_equipo_visitante = ev.id_equipo
JOIN sedes s ON p.id_sede = s.id_sede
WHERE p.id_torneo = 1
ORDER BY p.fecha ASC;

-- ------------------------------------------
-- 3. Buscar partidos por fecha (ej. '2026-06-08')
-- ------------------------------------------
SELECT 
    p.id_partido,
    t.nombre_torneo AS torneo,
    el.nombre_equipo AS equipo_local,
    ev.nombre_equipo AS equipo_visitante,
    s.nombre_sede AS sede,
    p.hora,
    p.estado
FROM partidos p
JOIN torneos t ON p.id_torneo = t.id_torneo
JOIN equipos el ON p.id_equipo_local = el.id_equipo
JOIN equipos ev ON p.id_equipo_visitante = ev.id_equipo
JOIN sedes s ON p.id_sede = s.id_sede
WHERE p.fecha = '2026-06-08'
ORDER BY p.hora ASC;

-- ------------------------------------------
-- 4. Buscar partidos por equipo (ej. Deportivo Barrio Sur, id_equipo = 1)
-- ------------------------------------------
SELECT 
    p.id_partido,
    t.nombre_torneo AS torneo,
    el.nombre_equipo AS equipo_local,
    p.goles_local,
    p.goles_visitante,
    ev.nombre_equipo AS equipo_visitante,
    s.nombre_sede AS sede,
    p.fecha,
    p.estado
FROM partidos p
JOIN torneos t ON p.id_torneo = t.id_torneo
JOIN equipos el ON p.id_equipo_local = el.id_equipo
JOIN equipos ev ON p.id_equipo_visitante = ev.id_equipo
JOIN sedes s ON p.id_sede = s.id_sede
WHERE p.id_equipo_local = 1 OR p.id_equipo_visitante = 1
ORDER BY p.fecha DESC;

-- ------------------------------------------
-- 5. Mostrar jugadores por equipo en un torneo específico (ej. Los Pinos F.C., id_equipo = 2, Torneo 1)
-- ------------------------------------------
SELECT 
    j.id_jugador,
    j.documento_identidad,
    j.nombre,
    j.apellido,
    j.posicion,
    j.fecha_nacimiento,
    TIMESTAMPDIFF(YEAR, j.fecha_nacimiento, CURDATE()) AS edad,
    ij.fecha_registro
FROM inscripciones_jugadores ij
JOIN jugadores j ON ij.id_jugador = j.id_jugador
WHERE ij.id_equipo = 2 AND ij.id_torneo = 1
ORDER BY j.apellido ASC, j.nombre ASC;

-- ------------------------------------------
-- 6. Mostrar equipos inscritos en un torneo (ej. Torneo 1)
-- ------------------------------------------
SELECT 
    e.id_equipo,
    e.nombre_equipo,
    e.representante,
    e.contacto,
    e.color,
    et.fecha_inscripcion
FROM equipos_torneo et
JOIN equipos e ON et.id_equipo = e.id_equipo
WHERE et.id_torneo = 1
ORDER BY e.nombre_equipo ASC;

-- ------------------------------------------
-- 7. Mostrar resultados de partidos (Partidos finalizados con marcador)
-- ------------------------------------------
SELECT 
    p.id_partido,
    t.nombre_torneo AS torneo,
    el.nombre_equipo AS equipo_local,
    p.goles_local,
    p.goles_visitante,
    ev.nombre_equipo AS equipo_visitante,
    s.nombre_sede AS sede,
    p.fecha
FROM partidos p
JOIN torneos t ON p.id_torneo = t.id_torneo
JOIN equipos el ON p.id_equipo_local = el.id_equipo
JOIN equipos ev ON p.id_equipo_visitante = ev.id_equipo
JOIN sedes s ON p.id_sede = s.id_sede
WHERE p.estado = 'Finalizado'
ORDER BY p.fecha DESC;

-- ------------------------------------------
-- 8. CONSULTA COMPLEJA: Generar tabla de posiciones dinámica
-- Calcula PJ, PG, PE, PP, GF, GC, DG y PTS para un torneo específico (ej. id_torneo = 1).
-- Incluye a todos los equipos inscritos, incluso si no han jugado partidos aún.
-- ------------------------------------------
SELECT 
    @rownum := @rownum + 1 AS posicion,
    tabla_base.*
FROM (
    SELECT 
        e.nombre_equipo AS equipo,
        COUNT(p.id_partido) AS PJ,
        COALESCE(SUM(CASE 
            WHEN (p.id_equipo_local = e.id_equipo AND p.goles_local > p.goles_visitante) OR 
                 (p.id_equipo_visitante = e.id_equipo AND p.goles_visitante > p.goles_local) THEN 1 
            ELSE 0 
        END), 0) AS PG,
        COALESCE(SUM(CASE 
            WHEN p.goles_local = p.goles_visitante THEN 1 
            ELSE 0 
        END), 0) AS PE,
        COALESCE(SUM(CASE 
            WHEN (p.id_equipo_local = e.id_equipo AND p.goles_local < p.goles_visitante) OR 
                 (p.id_equipo_visitante = e.id_equipo AND p.goles_visitante < p.goles_local) THEN 1 
            ELSE 0 
        END), 0) AS PP,
        COALESCE(SUM(CASE 
            WHEN p.id_equipo_local = e.id_equipo THEN p.goles_local 
            ELSE p.goles_visitante 
        END), 0) AS GF,
        COALESCE(SUM(CASE 
            WHEN p.id_equipo_local = e.id_equipo THEN p.goles_visitante 
            ELSE p.goles_local 
        END), 0) AS GC,
        COALESCE(SUM(CASE 
            WHEN p.id_equipo_local = e.id_equipo THEN p.goles_local - p.goles_visitante 
            ELSE p.goles_visitante - p.goles_local 
        END), 0) AS DG,
        COALESCE(SUM(CASE 
            WHEN (p.id_equipo_local = e.id_equipo AND p.goles_local > p.goles_visitante) OR 
                 (p.id_equipo_visitante = e.id_equipo AND p.goles_visitante > p.goles_local) THEN 3
            WHEN p.goles_local = p.goles_visitante THEN 1
            ELSE 0 
        END), 0) AS PTS
    FROM equipos_torneo et
    JOIN equipos e ON et.id_equipo = e.id_equipo
    LEFT JOIN partidos p ON p.id_torneo = et.id_torneo 
        AND p.estado = 'Finalizado' 
        AND (p.id_equipo_local = e.id_equipo OR p.id_equipo_visitante = e.id_equipo)
    WHERE et.id_torneo = 1 -- Filtrar por el Torneo 1 (Apertura)
    GROUP BY e.id_equipo, e.nombre_equipo
    ORDER BY PTS DESC, DG DESC, GF DESC
) AS tabla_base, (SELECT @rownum := 0) r;
