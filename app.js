/* ==========================================================================
   LÓGICA DE LA APLICACIÓN - SISTEMA DE GESTIÓN DE LIGA DEPORTIVA
   ========================================================================== */

// ==========================================
// 1. ESTADO DE LA APLICACIÓN (BASE DE DATOS IN-MEMORY)
// ==========================================
const state = {
    currentUser: null,

    // Semilla: Usuarios (10 registros)
    users: [
        { id: 1, username: 'carlos_admin', email: 'carlos.admin@liga.com', role: 'Admin', active: true },
        { id: 2, username: 'ana_planillero', email: 'ana.planillero@liga.com', role: 'Planillero', active: true },
        { id: 3, username: 'juan_planilla', email: 'juan.planilla@liga.com', role: 'Planillero', active: true },
        { id: 4, username: 'marta_admin', email: 'marta.admin@liga.com', role: 'Admin', active: true },
        { id: 5, username: 'luis_planillero', email: 'luis.planillero@liga.com', role: 'Planillero', active: true },
        { id: 6, username: 'sofia_admin', email: 'sofia.admin@liga.com', role: 'Admin', active: true },
        { id: 7, username: 'pedro_planillero', email: 'pedro.planillero@liga.com', role: 'Planillero', active: true },
        { id: 8, username: 'elena_planilla', email: 'elena.planilla@liga.com', role: 'Planillero', active: false },
        { id: 9, username: 'jorge_admin', email: 'jorge.admin@liga.com', role: 'Admin', active: true },
        { id: 10, username: 'lucia_planillero', email: 'lucia.planillero@liga.com', role: 'Planillero', active: true }
    ],

    // Semilla: Equipos (10 registros)
    teams: [
        { id: 1, name: 'Deportivo Barrio Sur', representative: 'Juan Pérez', contact: '3001234567', color: '#3b82f6' },
        { id: 2, name: 'Los Pinos F.C.', representative: 'Andrés Gómez', contact: '3019876543', color: '#10b981' },
        { id: 3, name: 'Empresa Central S.A.', representative: 'Marta Rincón', contact: '3104567890', color: '#f59e0b' },
        { id: 4, name: 'Real Arrabal', representative: 'Esteban Quito', contact: '3157891234', color: '#ef4444' },
        { id: 5, name: 'Talleres Mecánicos FC', representative: 'Roberto Flores', contact: '3203456789', color: '#8b5cf6' },
        { id: 6, name: 'Atlético Industrias', representative: 'Diana Salazar', contact: '3129874561', color: '#ec4899' },
        { id: 7, name: 'Unión San José', representative: 'Gabriel Castillo', contact: '3176543210', color: '#06b6d4' },
        { id: 8, name: 'La Rivera F.C.', representative: 'Clara Beltrán', contact: '3183216549', color: '#f43f5e' },
        { id: 9, name: 'Comercial del Valle', representative: 'Diego Torres', contact: '3114561239', color: '#14b8a6' },
        { id: 10, name: 'Estrella del Norte', representative: 'Patricia Rojas', contact: '3147894562', color: '#eab308' }
    ],

    // Semilla: Jugadores (30 registros)
    players: [
        { id: 1, doc: '1001001', name: 'Mateo', lastName: 'Díaz', birthDate: '1995-04-12', phone: '3002001001', position: 'Defensa' },
        { id: 2, doc: '1001002', name: 'Lucas', lastName: 'Silva', birthDate: '1996-08-22', phone: '3002001002', position: 'Mediocampista' },
        { id: 3, doc: '1001003', name: 'Santiago', lastName: 'Rojas', birthDate: '1994-01-15', phone: '3002001003', position: 'Delantero' },
        { id: 4, doc: '1001004', name: 'Sebastián', lastName: 'Castro', birthDate: '1997-11-30', phone: '3002001004', position: 'Portero' },
        { id: 5, doc: '1001005', name: 'Daniel', lastName: 'Mendoza', birthDate: '1993-06-05', phone: '3002001005', position: 'Defensa' },
        { id: 6, doc: '1001006', name: 'Samuel', lastName: 'Mejía', birthDate: '1998-03-25', phone: '3002001006', position: 'Mediocampista' },
        { id: 7, doc: '1001007', name: 'Nicolás', lastName: 'Giraldo', birthDate: '1999-07-19', phone: '3002001007', position: 'Delantero' },
        { id: 8, doc: '1001008', name: 'Alejandro', lastName: 'Herrera', birthDate: '1995-10-09', phone: '3002001008', position: 'Portero' },
        { id: 9, doc: '1001009', name: 'Martín', lastName: 'Gómez', birthDate: '1996-05-14', phone: '3002001009', position: 'Defensa' },
        { id: 10, doc: '1001010', name: 'Diego', lastName: 'Rodríguez', birthDate: '1994-12-02', phone: '3002001010', position: 'Mediocampista' },
        { id: 11, doc: '1001011', name: 'David', lastName: 'Sánchez', birthDate: '1997-09-11', phone: '3002001011', position: 'Delantero' },
        { id: 12, doc: '1001012', name: 'Felipe', lastName: 'Martínez', birthDate: '1993-02-28', phone: '3002001012', position: 'Portero' },
        { id: 13, doc: '1001013', name: 'Tomas', lastName: 'Pérez', birthDate: '1998-08-16', phone: '3002001013', position: 'Defensa' },
        { id: 14, doc: '1001014', name: 'Juan', lastName: 'García', birthDate: '1999-12-25', phone: '3002001014', position: 'Mediocampista' },
        { id: 15, doc: '1001015', name: 'Camilo', lastName: 'López', birthDate: '1995-03-03', phone: '3002001015', position: 'Delantero' },
        { id: 16, doc: '1001016', name: 'Andrés', lastName: 'González', birthDate: '1996-07-07', phone: '3002001016', position: 'Portero' },
        { id: 17, doc: '1001017', name: 'Julián', lastName: 'Cardona', birthDate: '1994-05-20', phone: '3002001017', position: 'Defensa' },
        { id: 18, doc: '1001018', name: 'Jerónimo', lastName: 'Marín', birthDate: '1997-10-10', phone: '3002001018', position: 'Mediocampista' },
        { id: 19, doc: '1001019', name: 'Emilio', lastName: 'Ramírez', birthDate: '1993-04-04', phone: '3002001019', position: 'Delantero' },
        { id: 20, doc: '1001020', name: 'Matías', lastName: 'Muñoz', birthDate: '1998-11-23', phone: '3002001020', position: 'Portero' },
        { id: 21, doc: '1001021', name: 'Leonardo', lastName: 'Vargas', birthDate: '1992-09-08', phone: '3002001021', position: 'Defensa' },
        { id: 22, doc: '1001022', name: 'Manuel', lastName: 'Álvarez', birthDate: '1995-01-29', phone: '3002001022', position: 'Mediocampista' },
        { id: 23, doc: '1001023', name: 'Esteban', lastName: 'Moreno', birthDate: '1996-06-17', phone: '3002001023', position: 'Delantero' },
        { id: 24, doc: '1001024', name: 'Cristian', lastName: 'Ortiz', birthDate: '1997-03-13', phone: '3002001024', position: 'Portero' },
        { id: 25, doc: '1001025', name: 'Hugo', lastName: 'Guerrero', birthDate: '1994-08-08', phone: '3002001025', position: 'Defensa' },
        { id: 26, doc: '1001026', name: 'Carlos', lastName: 'Ríos', birthDate: '1999-02-02', phone: '3002001026', position: 'Mediocampista' },
        { id: 27, doc: '1001027', name: 'Ricardo', lastName: 'Franco', birthDate: '1995-12-12', phone: '3002001027', position: 'Delantero' },
        { id: 28, doc: '1001028', name: 'Gabriel', lastName: 'Bermúdez', birthDate: '1996-04-30', phone: '3002001028', position: 'Portero' },
        { id: 29, doc: '1001029', name: 'Álvaro', lastName: 'Acosta', birthDate: '1993-10-24', phone: '3002001029', position: 'Defensa' },
        { id: 30, doc: '1001030', name: 'Enrique', lastName: 'Benítez', birthDate: '1998-05-18', phone: '3002001030', position: 'Mediocampista' }
    ],

    // Semilla: Sedes (5 registros)
    venues: [
        { id: 1, name: 'Polideportivo Municipal Cancha 1', address: 'Av. del Deporte 123', capacity: 500 },
        { id: 2, name: 'Cancha del Barrio Los Pinos', address: 'Calle 45 # 12-34', capacity: 200 },
        { id: 3, name: 'Complejo Deportivo La Rivera', address: 'Carrera 7 # 88-10', capacity: 800 },
        { id: 4, name: 'Cancha Sintética Municipal', address: 'Calle 5 # 22-11', capacity: 150 },
        { id: 5, name: 'Estadio Municipal de la Comuna', address: 'Av. de los Fundadores S/N', capacity: 3000 }
    ],

    // Semilla: Torneos (3 registros)
    tournaments: [
        { id: 1, name: 'Torneo Apertura Liga Municipal 2026', startDate: '2026-03-01', endDate: '2026-06-30', state: 'Activo' },
        { id: 2, name: 'Torneo Interempresas Municipal 2026', startDate: '2026-07-15', endDate: '2026-10-31', state: 'Borrador' },
        { id: 3, name: 'Torneo Relámpago Comunas 2026', startDate: '2026-11-01', endDate: '2026-12-20', state: 'Borrador' }
    ],

    // Tabla asociativa: equipos_torneo (Equipos inscritos por torneo)
    teamsTournaments: [
        { tournamentId: 1, teamId: 1 }, // Deportivo Barrio Sur en Torneo 1
        { tournamentId: 1, teamId: 2 }, // Los Pinos en Torneo 1
        { tournamentId: 1, teamId: 3 }, // Empresa Central en Torneo 1
        { tournamentId: 1, teamId: 4 }, // Real Arrabal en Torneo 1
        { tournamentId: 1, teamId: 5 }, // Talleres Mecánicos en Torneo 1
        { tournamentId: 1, teamId: 6 }  // Atlético Industrias en Torneo 1
    ],

    // Tabla asociativa: inscripciones_jugadores (20 registros en total)
    playerRegistrations: [
        // Barrio Sur
        { playerId: 1, tournamentId: 1, teamId: 1 },
        { playerId: 2, tournamentId: 1, teamId: 1 },
        { playerId: 3, tournamentId: 1, teamId: 1 },
        { playerId: 4, tournamentId: 1, teamId: 1 },
        // Los Pinos
        { playerId: 5, tournamentId: 1, teamId: 2 },
        { playerId: 6, tournamentId: 1, teamId: 2 },
        { playerId: 7, tournamentId: 1, teamId: 2 },
        { playerId: 8, tournamentId: 1, teamId: 2 },
        // Empresa Central
        { playerId: 9, tournamentId: 1, teamId: 3 },
        { playerId: 10, tournamentId: 1, teamId: 3 },
        { playerId: 11, tournamentId: 1, teamId: 3 },
        // Real Arrabal
        { playerId: 12, tournamentId: 1, teamId: 4 },
        { playerId: 13, tournamentId: 1, teamId: 4 },
        { playerId: 14, tournamentId: 1, teamId: 4 },
        // Talleres Mecánicos
        { playerId: 15, tournamentId: 1, teamId: 5 },
        { playerId: 16, tournamentId: 1, teamId: 5 },
        { playerId: 17, tournamentId: 1, teamId: 5 },
        // Atlético Industrias
        { playerId: 18, tournamentId: 1, teamId: 6 },
        { playerId: 19, tournamentId: 1, teamId: 6 },
        { playerId: 20, tournamentId: 1, teamId: 6 }
    ],

    // Semilla: Partidos (10 registros)
    matches: [
        { id: 1, tournamentId: 1, localTeamId: 1, visitorTeamId: 2, venueId: 1, date: '2026-06-01', time: '14:00', localGoals: 3, visitorGoals: 1, state: 'Finalizado' },
        { id: 2, tournamentId: 1, localTeamId: 3, visitorTeamId: 4, venueId: 2, date: '2026-06-01', time: '16:00', localGoals: 2, visitorGoals: 2, state: 'Finalizado' },
        { id: 3, tournamentId: 1, localTeamId: 5, visitorTeamId: 6, venueId: 3, date: '2026-06-02', time: '14:00', localGoals: 0, visitorGoals: 2, state: 'Finalizado' },
        { id: 4, tournamentId: 1, localTeamId: 2, visitorTeamId: 3, venueId: 1, date: '2026-06-08', time: '14:00', localGoals: 1, visitorGoals: 2, state: 'Finalizado' },
        { id: 5, tournamentId: 1, localTeamId: 4, visitorTeamId: 5, venueId: 4, date: '2026-06-08', time: '16:00', localGoals: 4, visitorGoals: 1, state: 'Finalizado' },
        { id: 6, tournamentId: 1, localTeamId: 6, visitorTeamId: 1, venueId: 5, date: '2026-06-09', time: '14:00', localGoals: 2, visitorGoals: 2, state: 'Finalizado' },

        { id: 7, tournamentId: 1, localTeamId: 1, visitorTeamId: 3, venueId: 1, date: '2026-06-15', time: '14:00', localGoals: null, visitorGoals: null, state: 'Programado' },
        { id: 8, tournamentId: 1, localTeamId: 2, visitorTeamId: 5, venueId: 2, date: '2026-06-15', time: '16:00', localGoals: null, visitorGoals: null, state: 'Programado' },
        { id: 9, tournamentId: 1, localTeamId: 4, visitorTeamId: 6, venueId: 3, date: '2026-06-16', time: '14:00', localGoals: null, visitorGoals: null, state: 'Programado' },
        { id: 10, tournamentId: 1, localTeamId: 3, visitorTeamId: 5, venueId: 5, date: '2026-06-22', time: '15:00', localGoals: null, visitorGoals: null, state: 'Programado' }
    ]
};

// ==========================================
// 2. CONFIGURACIÓN DEL EDITOR SQL Y CONSULTAS
// ==========================================
const sqlQueries = {
    partidos_sedes: `SELECT p.id_partido, t.nombre_torneo AS torneo, el.nombre_equipo AS equipo_local, ev.nombre_equipo AS equipo_visitante, s.nombre_sede AS sede, p.fecha, p.hora, p.estado
FROM partidos p
JOIN torneos t ON p.id_torneo = t.id_torneo
JOIN equipos el ON p.id_equipo_local = el.id_equipo
JOIN equipos ev ON p.id_equipo_visitante = ev.id_equipo
JOIN sedes s ON p.id_sede = s.id_sede
ORDER BY p.fecha ASC, p.hora ASC;`,

    partidos_torneo: `SELECT p.id_partido, el.nombre_equipo AS equipo_local, ev.nombre_equipo AS equipo_visitante, s.nombre_sede AS sede, p.fecha, p.hora, p.estado
FROM partidos p
JOIN equipos el ON p.id_equipo_local = el.id_equipo
JOIN equipos ev ON p.id_equipo_visitante = ev.id_equipo
JOIN sedes s ON p.id_sede = s.id_sede
WHERE p.id_torneo = 1
ORDER BY p.fecha ASC;`,

    partidos_fecha: `SELECT p.id_partido, t.nombre_torneo AS torneo, el.nombre_equipo AS equipo_local, ev.nombre_equipo AS equipo_visitante, s.nombre_sede AS sede, p.hora, p.estado
FROM partidos p
JOIN torneos t ON p.id_torneo = t.id_torneo
JOIN equipos el ON p.id_equipo_local = el.id_equipo
JOIN equipos ev ON p.id_equipo_visitante = ev.id_equipo
JOIN sedes s ON p.id_sede = s.id_sede
WHERE p.fecha = '2026-06-08'
ORDER BY p.hora ASC;`,

    partidos_equipo: `SELECT p.id_partido, t.nombre_torneo AS torneo, el.nombre_equipo AS equipo_local, p.goles_local, p.goles_visitante, ev.nombre_equipo AS equipo_visitante, s.nombre_sede AS sede, p.fecha, p.estado
FROM partidos p
JOIN torneos t ON p.id_torneo = t.id_torneo
JOIN equipos el ON p.id_equipo_local = el.id_equipo
JOIN equipos ev ON p.id_equipo_visitante = ev.id_equipo
JOIN sedes s ON p.id_sede = s.id_sede
WHERE p.id_equipo_local = 1 OR p.id_equipo_visitante = 1
ORDER BY p.fecha DESC;`,

    jugadores_equipo: `SELECT j.id_jugador, j.documento_identidad, j.nombre, j.apellido, j.posicion, j.fecha_nacimiento, ij.fecha_registro
FROM inscripciones_jugadores ij
JOIN jugadores j ON ij.id_jugador = j.id_jugador
WHERE ij.id_equipo = 2 AND ij.id_torneo = 1
ORDER BY j.apellido ASC, j.nombre ASC;`,

    equipos_torneo: `SELECT e.id_equipo, e.nombre_equipo, e.representante, e.contacto, e.color, et.fecha_inscripcion
FROM equipos_torneo et
JOIN equipos e ON et.id_equipo = e.id_equipo
WHERE et.id_torneo = 1
ORDER BY e.nombre_equipo ASC;`,

    resultados: `SELECT p.id_partido, t.nombre_torneo AS torneo, el.nombre_equipo AS equipo_local, p.goles_local, p.goles_visitante, ev.nombre_equipo AS equipo_visitante, s.nombre_sede, p.fecha
FROM partidos p
JOIN torneos t ON p.id_torneo = t.id_torneo
JOIN equipos el ON p.id_equipo_local = el.id_equipo
JOIN equipos ev ON p.id_equipo_visitante = ev.id_equipo
JOIN sedes s ON p.id_sede = s.id_sede
WHERE p.estado = 'Finalizado'
ORDER BY p.fecha DESC;`,

    tabla_posiciones: `SELECT 
    e.nombre_equipo AS equipo,
    COUNT(p.id_partido) AS PJ,
    COALESCE(SUM(CASE WHEN (p.id_equipo_local = e.id_equipo AND p.goles_local > p.goles_visitante) OR (p.id_equipo_visitante = e.id_equipo AND p.goles_visitante > p.goles_local) THEN 1 ELSE 0 END), 0) AS PG,
    COALESCE(SUM(CASE WHEN p.goles_local = p.goles_visitante THEN 1 ELSE 0 END), 0) AS PE,
    COALESCE(SUM(CASE WHEN (p.id_equipo_local = e.id_equipo AND p.goles_local < p.goles_visitante) OR (p.id_equipo_visitante = e.id_equipo AND p.goles_visitante < p.goles_local) THEN 1 ELSE 0 END), 0) AS PP,
    COALESCE(SUM(CASE WHEN p.id_equipo_local = e.id_equipo THEN p.goles_local ELSE p.goles_visitante END), 0) AS GF,
    COALESCE(SUM(CASE WHEN p.id_equipo_local = e.id_equipo THEN p.goles_visitante ELSE p.goles_local END), 0) AS GC,
    COALESCE(SUM(CASE WHEN p.id_equipo_local = e.id_equipo THEN p.goles_local - p.goles_visitante ELSE p.goles_visitante - p.goles_local END), 0) AS DG,
    COALESCE(SUM(CASE 
        WHEN (p.id_equipo_local = e.id_equipo AND p.goles_local > p.goles_visitante) OR (p.id_equipo_visitante = e.id_equipo AND p.goles_visitante > p.goles_local) THEN 3
        WHEN p.goles_local = p.goles_visitante THEN 1
        ELSE 0 
    END), 0) AS PTS
FROM equipos_torneo et
JOIN equipos e ON et.id_equipo = e.id_equipo
LEFT JOIN partidos p ON p.id_torneo = et.id_torneo AND p.estado = 'Finalizado' AND (p.id_equipo_local = e.id_equipo OR p.id_equipo_visitante = e.id_equipo)
WHERE et.id_torneo = 1
GROUP BY e.id_equipo, e.nombre_equipo
ORDER BY PTS DESC, DG DESC, GF DESC;`
};

let selectedQueryKey = 'partidos_sedes';
let currentCalendarDate = new Date(2026, 5, 1); // Junio 2026 (los datos semilla están principalmente en Junio 2026)

// ==========================================
// 3. EVENTOS DE INICIALIZACIÓN
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    // Verificar login
    checkAuthentication();

    // Cargar datos en la UI
    renderAll();

    // Eventos de Navegación
    document.querySelectorAll('.menu-item').forEach(button => {
        button.addEventListener('click', (e) => {
            const section = e.currentTarget.getAttribute('data-section');
            if (section) {
                switchSection(section);
            }
        });
    });

    // Theme Toggle
    document.getElementById('themeToggleBtn').addEventListener('click', () => {
        document.body.classList.toggle('light-theme');
        const isLight = document.body.classList.contains('light-theme');
        document.querySelector('.toggle-icon').textContent = isLight ? '☀️' : '🌙';
    });

    // Formulario de Login
    document.getElementById('loginForm').addEventListener('submit', handleLogin);
    document.getElementById('logoutBtn').addEventListener('click', handleLogout);

    // Consola SQL
    document.getElementById('runSqlQueryBtn').addEventListener('click', executeSimulatedQuery);

    // Buscador Global Reactivo
    const globalSearchInput = document.getElementById('globalSearch');
    if (globalSearchInput) {
        globalSearchInput.addEventListener('input', handleGlobalSearch);
    }

    // Navegación Calendario
    const prevBtn = document.getElementById('calPrevMonthBtn');
    const nextBtn = document.getElementById('calNextMonthBtn');
    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => {
            currentCalendarDate.setMonth(currentCalendarDate.getMonth() - 1);
            renderCalendar();
        });
        nextBtn.addEventListener('click', () => {
            currentCalendarDate.setMonth(currentCalendarDate.getMonth() + 1);
            renderCalendar();
        });
    }

    // Carga de Query por defecto en la consola
    loadSQLQuery('partidos_sedes');
});

// ==========================================
// 4. SISTEMA DE AUTENTICACIÓN
// ==========================================
function checkAuthentication() {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
        state.currentUser = JSON.parse(savedUser);
        document.getElementById('login-overlay').classList.add('hidden');
        updateUserSidebar();
    } else {
        document.getElementById('login-overlay').classList.remove('hidden');
    }
}

function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value.trim();
    const pass = document.getElementById('loginPassword').value;

    // Buscar en usuarios semilla
    const matchedUser = state.users.find(u => u.email === email);

    if (matchedUser && pass === 'admin123') {
        if (!matchedUser.active) {
            showToast('El usuario está inactivo. Contacte al administrador.', 'error');
            return;
        }
        state.currentUser = matchedUser;
        localStorage.setItem('currentUser', JSON.stringify(matchedUser));
        document.getElementById('login-overlay').classList.add('hidden');
        updateUserSidebar();
        showToast(`¡Bienvenido de nuevo, ${matchedUser.username}!`, 'success');
        renderAll();
    } else {
        showToast('Credenciales incorrectas. (Clave demo: admin123)', 'error');
    }
}

function handleLogout() {
    state.currentUser = null;
    localStorage.removeItem('currentUser');
    checkAuthentication();
    showToast('Sesión cerrada correctamente.', 'success');
}

function updateUserSidebar() {
    if (state.currentUser) {
        document.querySelector('.user-info h4').textContent = state.currentUser.username;
        document.querySelector('.user-info span').textContent = state.currentUser.role;
        document.querySelector('.user-avatar').textContent = state.currentUser.username.substring(0, 2).toUpperCase();
    }
}

// ==========================================
// 5. CONTROLADOR DE VISTAS (Navegación)
// ==========================================
function switchSection(sectionId) {
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
    });
    document.querySelectorAll('.menu-item').forEach(btn => {
        btn.classList.remove('active');
    });

    const targetSection = document.getElementById(`section-${sectionId}`);
    if (targetSection) {
        targetSection.classList.add('active');
    }

    const targetBtn = document.querySelector(`.menu-item[data-section="${sectionId}"]`);
    if (targetBtn) {
        targetBtn.classList.add('active');
    }

    // Recargar componentes específicos al entrar a su vista
    if (sectionId === 'posiciones') {
        loadStandingsTable();
    } else if (sectionId === 'partidos') {
        renderMatches();
    } else if (sectionId === 'jugadores') {
        renderPlayers();
    } else if (sectionId === 'equipos') {
        renderTeams();
    } else if (sectionId === 'torneos') {
        renderTournaments();
    } else if (sectionId === 'sedes') {
        renderVenues();
    } else if (sectionId === 'dashboard') {
        renderDashboard();
    } else if (sectionId === 'calendario') {
        renderCalendar();
    }
}

// ==========================================
// 6. RENDERIZADORES DE DATOS Y COMPONENTES
// ==========================================
function renderAll() {
    renderDashboard();
    renderTournaments();
    renderTeams();
    renderPlayers();
    renderVenues();
    renderMatches();
    loadStandingsTable();
    updateSelectors();
}

function updateSelectors() {
    // Rellenar selectores de torneos en modales
    const tSelects = ['enrollTournament', 'matchTournament', 'filterMatchTournament', 'standingsTournamentSelect'];
    tSelects.forEach(id => {
        const select = document.getElementById(id);
        if (select) {
            select.innerHTML = state.tournaments.map(t => `<option value="${t.id}">${t.name}</option>`).join('');
        }
    });

    // Rellenar selectores de jugadores
    const pSelect = document.getElementById('enrollPlayer');
    if (pSelect) {
        pSelect.innerHTML = state.players
            .map(p => `<option value="${p.id}">${p.lastName}, ${p.name} (${p.doc})</option>`)
            .join('');
    }

    // Rellenar selectores de sedes
    const vSelect = document.getElementById('matchVenue');
    if (vSelect) {
        vSelect.innerHTML = state.venues.map(v => `<option value="${v.id}">${v.name}</option>`).join('');
    }

    // Rellenar selectores de equipos
    updateEnrollTeamDropdown();
    updateMatchTeamsDropdowns();

    // Rellenar filtro de equipos en vista jugadores
    const filterPlayerTeam = document.getElementById('filterPlayerTeam');
    if (filterPlayerTeam) {
        filterPlayerTeam.innerHTML = `<option value="all">-- Todos los Equipos --</option>` +
            state.teams.map(t => `<option value="${t.id}">${t.name}</option>`).join('');
    }
}

function updateEnrollTeamDropdown() {
    const tournamentId = parseInt(document.getElementById('enrollTournament').value);
    const select = document.getElementById('enrollTeam');
    if (select) {
        // Equipos inscritos en este torneo
        const enrolledTeamIds = state.teamsTournaments
            .filter(et => et.tournamentId === tournamentId)
            .map(et => et.teamId);

        const enrolledTeams = state.teams.filter(t => enrolledTeamIds.includes(t.id));
        select.innerHTML = enrolledTeams.map(t => `<option value="${t.id}">${t.name}</option>`).join('');
    }
}

function updateMatchTeamsDropdowns() {
    const tournamentId = parseInt(document.getElementById('matchTournament').value);
    const localSelect = document.getElementById('matchLocalTeam');
    const visitorSelect = document.getElementById('matchVisitorTeam');

    if (localSelect && visitorSelect) {
        const enrolledTeamIds = state.teamsTournaments
            .filter(et => et.tournamentId === tournamentId)
            .map(et => et.teamId);

        const enrolledTeams = state.teams.filter(t => enrolledTeamIds.includes(t.id));
        const optionsHTML = enrolledTeams.map(t => `<option value="${t.id}">${t.name}</option>`).join('');

        localSelect.innerHTML = optionsHTML;
        visitorSelect.innerHTML = optionsHTML;

        if (visitorSelect.options.length > 1) {
            visitorSelect.selectedIndex = 1; // Seleccionar el segundo por defecto para que no sean iguales
        }
    }
}

// RENDER: Panel Principal (Dashboard)
function renderDashboard() {
    document.getElementById('stat-tournaments').textContent = state.tournaments.filter(t => t.state === 'Activo').length;
    document.getElementById('stat-teams').textContent = state.teams.length;
    document.getElementById('stat-players').textContent = state.players.length;
    document.getElementById('stat-venues').textContent = state.venues.length;

    // Próximos 5 partidos
    const upcoming = state.matches
        .filter(m => m.state === 'Programado')
        .sort((a, b) => new Date(a.date) - new Date(b.date))
        .slice(0, 5);

    const tbody = document.getElementById('dashboardMatchesTable').querySelector('tbody');
    if (upcoming.length === 0) {
        tbody.innerHTML = `<tr><td colspan="6" class="text-center text-muted">No hay partidos programados próximamente.</td></tr>`;
    } else {
        tbody.innerHTML = upcoming.map(m => {
            const tour = state.tournaments.find(t => t.id === m.tournamentId)?.name || 'Sin torneo';
            const locTeam = state.teams.find(t => t.id === m.localTeamId);
            const visTeam = state.teams.find(t => t.id === m.visitorTeamId);
            const loc = locTeam ? locTeam.name : 'L';
            const vis = visTeam ? visTeam.name : 'V';
            const locColor = locTeam ? (locTeam.color || '#10b981') : '#10b981';
            const visColor = visTeam ? (visTeam.color || '#10b981') : '#10b981';
            const venue = state.venues.find(v => v.id === m.venueId)?.name || 'Sede';
            return `
                <tr>
                    <td>${m.date}</td>
                    <td><strong>${tour.split(' ')[1] || tour}</strong></td>
                    <td style="white-space: nowrap;">
                        <span class="team-color-dot" style="background-color: ${locColor}; box-shadow: 0 0 6px ${locColor};"></span>
                        <span>${loc}</span>
                        <span class="text-muted" style="margin: 0 4px;">vs</span>
                        <span class="team-color-dot" style="background-color: ${visColor}; box-shadow: 0 0 6px ${visColor};"></span>
                        <span>${vis}</span>
                    </td>
                    <td>${venue.split(' ')[0]}...</td>
                    <td>${m.time}</td>
                    <td><span class="status-badge programado">${m.state}</span></td>
                </tr>
            `;
        }).join('');
    }

    // Tabla de Líderes Resumen (Torneo 1)
    const leaders = calculateStandings(1).slice(0, 3);
    const leaderboard = document.getElementById('dashboardLeaderboard');
    if (leaders.length === 0) {
        leaderboard.innerHTML = `<p class="text-muted text-center">Sin clasificaciones calculadas.</p>`;
    } else {
        leaderboard.innerHTML = leaders.map((l, index) => {
            const totalG = l.gf + l.gc;
            const gfPercentage = totalG > 0 ? (l.gf / totalG) * 100 : 50;
            const gcPercentage = totalG > 0 ? (l.gc / totalG) * 100 : 50;
            const team = state.teams.find(t => t.name === l.name);
            const teamColor = team ? (team.color || '#10b981') : '#10b981';
            return `
                <div class="leaderboard-item" style="flex-direction: column; align-items: stretch; gap: 8px;">
                    <div style="display: flex; align-items: center; justify-content: space-between; width: 100%;">
                        <span class="leader-name" style="display: flex; align-items: center;">
                            <strong>#${index + 1}</strong>
                            <span class="team-color-dot" style="background-color: ${teamColor}; box-shadow: 0 0 6px ${teamColor}; margin-left: 6px;"></span>
                            <span>${l.name}</span>
                        </span>
                        <span class="leader-pts">${l.pts} PTS</span>
                    </div>
                    <div style="display: flex; flex-direction: column; gap: 4px; width: 100%;">
                        <div style="display: flex; justify-content: space-between; font-size: 0.75rem; color: var(--text-secondary);">
                            <span>Goles Favor: ${l.gf}</span>
                            <span>Goles Contra: ${l.gc}</span>
                        </div>
                        <div class="bar-container" style="background: rgba(255,255,255,0.05); height: 8px; border-radius: 4px; overflow: hidden; display: flex; width: 100%;">
                            <div style="background: ${teamColor}; width: ${gfPercentage}%; height: 100%;"></div>
                            <div style="background: var(--danger); width: ${gcPercentage}%; height: 100%;"></div>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    }
}

// RENDER: Torneos
function renderTournaments() {
    const tbody = document.getElementById('tournamentsTable').querySelector('tbody');
    tbody.innerHTML = state.tournaments.map(t => {
        const count = state.teamsTournaments.filter(et => et.tournamentId === t.id).length;
        return `
            <tr>
                <td><strong>${t.name}</strong></td>
                <td>${t.startDate}</td>
                <td>${t.endDate}</td>
                <td><span class="score-badge">${count} equipos</span></td>
                <td><span class="status-badge ${t.state === 'Activo' ? 'finalizado' : 'programado'}">${t.state}</span></td>
                <td>
                    <button class="btn-secondary btn-sm" onclick="handleEnrollTeamClick(${t.id})">🔗 Inscribir Equipo</button>
                </td>
            </tr>
        `;
    }).join('');
}

// RENDER: Equipos
function renderTeams() {
    const tbody = document.getElementById('teamsTable').querySelector('tbody');
    tbody.innerHTML = state.teams.map(t => {
        const teamColor = t.color || '#10b981';
        return `
            <tr>
                <td style="white-space: nowrap;">
                    <span class="team-color-dot" style="background-color: ${teamColor}; box-shadow: 0 0 6px ${teamColor};"></span>
                    <strong>${t.name}</strong>
                </td>
                <td>${t.representative}</td>
                <td>${t.contact || 'No registrado'}</td>
                <td>
                    <button class="btn-danger btn-sm" onclick="handleDeleteTeam(${t.id})">Eliminar</button>
                </td>
            </tr>
        `;
    }).join('');
}

// RENDER: Jugadores
function renderPlayers() {
    const filterTeamVal = document.getElementById('filterPlayerTeam').value;
    const tbody = document.getElementById('playersTable').querySelector('tbody');

    let filteredPlayers = state.players;
    if (filterTeamVal !== 'all') {
        const teamId = parseInt(filterTeamVal);
        const registeredPlayerIds = state.playerRegistrations
            .filter(pr => pr.teamId === teamId)
            .map(pr => pr.playerId);
        filteredPlayers = state.players.filter(p => registeredPlayerIds.includes(p.id));
    }

    tbody.innerHTML = filteredPlayers.map(p => {
        // Encontrar equipo actual en Torneo 1
        const reg = state.playerRegistrations.find(pr => pr.playerId === p.id && pr.tournamentId === 1);
        let teamNameHtml = '<span class="text-danger">Sin Equipo</span>';
        if (reg) {
            const team = state.teams.find(t => t.id === reg.teamId);
            if (team) {
                const teamColor = team.color || '#10b981';
                teamNameHtml = `
                    <span class="team-color-dot" style="background-color: ${teamColor}; box-shadow: 0 0 6px ${teamColor};"></span>
                    <span>${team.name}</span>
                `;
            }
        }

        // Posición
        const position = p.position || 'Mediocampista';
        const posClass = position.toLowerCase(); // portero, defensa, mediocampista, delantero

        return `
            <tr>
                <td><code>${p.doc}</code></td>
                <td><strong>${p.lastName}, ${p.name}</strong></td>
                <td><span class="badge-posicion ${posClass}">${position}</span></td>
                <td>${p.birthDate}</td>
                <td>${p.phone || '-'}</td>
                <td style="white-space: nowrap;">${teamNameHtml}</td>
                <td>
                    <button class="btn-danger btn-sm" onclick="handleDeletePlayer(${p.id})">Desvincular</button>
                </td>
            </tr>
        `;
    }).join('');
}

// RENDER: Sedes
function renderVenues() {
    const tbody = document.getElementById('venuesTable').querySelector('tbody');
    tbody.innerHTML = state.venues.map(v => `
        <tr>
            <td><strong>${v.name}</strong></td>
            <td>${v.address}</td>
            <td>${v.capacity.toLocaleString()} esp.</td>
            <td>
                <button class="btn-danger btn-sm" onclick="handleDeleteVenue(${v.id})">Eliminar</button>
            </td>
        </tr>
    `).join('');
}

// RENDER: Partidos (Fixture)
function renderMatches() {
    const tournamentId = parseInt(document.getElementById('filterMatchTournament').value);
    const dateVal = document.getElementById('filterMatchDate').value;

    let filtered = state.matches.filter(m => m.tournamentId === tournamentId);
    if (dateVal) {
        filtered = filtered.filter(m => m.date === dateVal);
    }

    const tbody = document.getElementById('matchesTable').querySelector('tbody');
    if (filtered.length === 0) {
        tbody.innerHTML = `<tr><td colspan="7" class="text-center text-muted">No se encontraron partidos programados con estos filtros.</td></tr>`;
        return;
    }

    tbody.innerHTML = filtered.map(m => {
        const locTeam = state.teams.find(t => t.id === m.localTeamId);
        const visTeam = state.teams.find(t => t.id === m.visitorTeamId);
        const loc = locTeam ? locTeam.name : 'L';
        const vis = visTeam ? visTeam.name : 'V';
        const locColor = locTeam ? (locTeam.color || '#10b981') : '#10b981';
        const visColor = visTeam ? (visTeam.color || '#10b981') : '#10b981';

        const venue = state.venues.find(v => v.id === m.venueId)?.name || 'Sede';
        const score = m.state === 'Finalizado' || m.state === 'En Juego'
            ? `<span class="score-badge">${m.localGoals} - ${m.visitorGoals}</span>`
            : `<span class="score-badge">VS</span>`;

        const isPlanilleroOrAdmin = state.currentUser && (state.currentUser.role === 'Admin' || state.currentUser.role === 'Planillero');
        const actionBtn = isPlanilleroOrAdmin
            ? `<button class="btn-primary btn-sm" onclick="openScoreModal(${m.id})">⚽ Marcador</button>`
            : `<span class="text-muted">Solo lectura</span>`;

        let statusClass = 'programado';
        if (m.state === 'Finalizado') statusClass = 'finalizado';
        if (m.state === 'En Juego') statusClass = 'en-juego';
        if (m.state === 'Cancelado') statusClass = 'cancelado';

        return `
            <tr>
                <td>${m.date} - ${m.time}</td>
                <td>${venue}</td>
                <td class="text-right" style="white-space: nowrap;">
                    <strong>${loc}</strong>
                    <span class="team-color-dot" style="background-color: ${locColor}; box-shadow: 0 0 6px ${locColor}; margin-left: 8px; margin-right: 0;"></span>
                </td>
                <td class="text-center">${score}</td>
                <td style="white-space: nowrap;">
                    <span class="team-color-dot" style="background-color: ${visColor}; box-shadow: 0 0 6px ${visColor};"></span>
                    <strong>${vis}</strong>
                </td>
                <td><span class="status-badge ${statusClass}">${m.state}</span></td>
                <td>${actionBtn}</td>
            </tr>
        `;
    }).join('');
}

function filterMatchesList() {
    renderMatches();
}

function clearMatchFilters() {
    document.getElementById('filterMatchDate').value = '';
    renderMatches();
}

function filterPlayersList() {
    renderPlayers();
}

// ==========================================
// 7. FORMULARIOS Y CRUD (CREACIÓN DE REGISTROS)
// ==========================================
function openModal(id) {
    document.getElementById(id).classList.add('open');
}

function closeModal(id) {
    document.getElementById(id).classList.remove('open');
}

// Crear Torneo
function handleCreateTournament(e) {
    e.preventDefault();
    const name = document.getElementById('tourName').value.trim();
    const start = document.getElementById('tourStart').value;
    const end = document.getElementById('tourEnd').value;
    const status = document.getElementById('tourState').value;

    if (new Date(end) < new Date(start)) {
        showToast('La fecha de fin no puede ser anterior a la de inicio.', 'error');
        return;
    }

    const newTour = {
        id: state.tournaments.length + 1,
        name,
        startDate: start,
        endDate: end,
        state: status
    };

    state.tournaments.push(newTour);
    closeModal('tournamentModal');
    document.getElementById('tournamentForm').reset();
    showToast(`Torneo "${name}" creado exitosamente.`, 'success');
    renderAll();
}

// Crear Equipo
function handleCreateTeam(e) {
    e.preventDefault();
    const name = document.getElementById('teamName').value.trim();
    const rep = document.getElementById('teamRepresentative').value.trim();
    const contact = document.getElementById('teamContact').value.trim();
    const color = document.getElementById('teamColor').value;

    // Validar nombre único
    if (state.teams.some(t => t.name.toLowerCase() === name.toLowerCase())) {
        showToast('El nombre de equipo ya existe en el sistema.', 'error');
        return;
    }

    const newTeam = {
        id: state.teams.length + 1,
        name,
        representative: rep,
        contact,
        color
    };

    state.teams.push(newTeam);
    closeModal('teamModal');
    document.getElementById('teamForm').reset();
    showToast(`Equipo "${name}" registrado correctamente.`, 'success');
    renderAll();
}

// Crear Jugador
function handleCreatePlayer(e) {
    e.preventDefault();
    const doc = document.getElementById('playerDoc').value.trim();
    const name = document.getElementById('playerName').value.trim();
    const lastName = document.getElementById('playerLastName').value.trim();
    const birth = document.getElementById('playerBirth').value;
    const phone = document.getElementById('playerPhone').value.trim();
    const position = document.getElementById('playerPosition').value;

    // Validar documento único
    if (state.players.some(p => p.doc === doc)) {
        showToast('Ya existe un jugador con este documento de identidad.', 'error');
        return;
    }

    const newPlayer = {
        id: state.players.length + 1,
        doc,
        name,
        lastName,
        birthDate: birth,
        phone,
        position
    };

    state.players.push(newPlayer);
    closeModal('playerModal');
    document.getElementById('playerForm').reset();
    showToast(`Jugador "${name} ${lastName}" creado.`, 'success');
    renderAll();
}

// Crear Sede
function handleCreateVenue(e) {
    e.preventDefault();
    const name = document.getElementById('venueName').value.trim();
    const address = document.getElementById('venueAddress').value.trim();
    const capacity = parseInt(document.getElementById('venueCapacity').value);

    if (state.venues.some(v => v.name.toLowerCase() === name.toLowerCase())) {
        showToast('El nombre de la sede ya está registrado.', 'error');
        return;
    }

    const newVenue = {
        id: state.venues.length + 1,
        name,
        address,
        capacity
    };

    state.venues.push(newVenue);
    closeModal('venueModal');
    document.getElementById('venueForm').reset();
    showToast(`Sede "${name}" registrada con éxito.`, 'success');
    renderAll();
}

// Inscribir Equipo en Torneo (N:M)
function handleEnrollTeamClick(tournamentId) {
    const teamName = prompt('Ingrese el nombre exacto del equipo a inscribir en este torneo:');
    if (!teamName) return;

    const team = state.teams.find(t => t.name.toLowerCase() === teamName.trim().toLowerCase());
    if (!team) {
        showToast('El equipo ingresado no existe. Regístrelo primero.', 'error');
        return;
    }

    // Verificar si ya está inscrito
    const exists = state.teamsTournaments.some(et => et.tournamentId === tournamentId && et.teamId === team.id);
    if (exists) {
        showToast('El equipo ya se encuentra inscrito en este torneo.', 'warning');
        return;
    }

    state.teamsTournaments.push({ tournamentId, teamId: team.id });
    showToast(`Equipo "${team.name}" inscrito al torneo con éxito.`, 'success');
    renderAll();
}

// Inscribir Jugador en Equipo por Torneo (REGLAS DE NEGOCIO 3 y 6)
function handleEnrollPlayer(e) {
    e.preventDefault();
    const tournamentId = parseInt(document.getElementById('enrollTournament').value);
    const teamId = parseInt(document.getElementById('enrollTeam').value);
    const playerId = parseInt(document.getElementById('enrollPlayer').value);

    const player = state.players.find(p => p.id === playerId);
    const team = state.teams.find(t => t.id === teamId);

    if (!teamId || !playerId) {
        showToast('Debe seleccionar equipo y jugador válidos.', 'error');
        return;
    }

    // REGLA DE NEGOCIO 3 & 6: Buscar inscripciones previas en este torneo
    const existingReg = state.playerRegistrations.find(pr => pr.playerId === playerId && pr.tournamentId === tournamentId);

    if (existingReg) {
        if (existingReg.teamId === teamId) {
            // Regla 6: Un jugador no puede estar inscrito dos veces en el mismo equipo para el mismo torneo.
            showToast(`Error de Negocio: El jugador ya está inscrito en ${team.name} para este torneo. (Regla 6)`, 'error');
        } else {
            // Regla 3: Un jugador no puede pertenecer a dos equipos diferentes en el mismo torneo.
            const otherTeamName = state.teams.find(t => t.id === existingReg.teamId)?.name || 'otro equipo';
            showToast(`Error de Negocio: El jugador ya está jugando para "${otherTeamName}" en este mismo torneo. (Regla 3)`, 'error');
        }
        return;
    }

    // Registrar inscripción
    state.playerRegistrations.push({ playerId, tournamentId, teamId });
    closeModal('enrollPlayerModal');
    showToast(`Jugador ${player.name} inscrito en ${team.name} con éxito.`, 'success');
    renderAll();
}

// Programar Partido (REGLAS DE NEGOCIO 1, 2 y 5)
function handleCreateMatch(e) {
    e.preventDefault();
    const tournamentId = parseInt(document.getElementById('matchTournament').value);
    const localTeamId = parseInt(document.getElementById('matchLocalTeam').value);
    const visitorTeamId = parseInt(document.getElementById('matchVisitorTeam').value);
    const venueId = parseInt(document.getElementById('matchVenue').value);
    const date = document.getElementById('matchDate').value;
    const time = document.getElementById('matchTime').value;

    if (localTeamId === visitorTeamId) {
        showToast('Un equipo no puede jugar contra sí mismo.', 'error');
        return;
    }

    // REGLA DE NEGOCIO 5: Mínimo dos equipos en el torneo
    const countTeams = state.teamsTournaments.filter(et => et.tournamentId === tournamentId).length;
    if (countTeams < 2) {
        showToast('Error de Negocio: El torneo debe tener al menos dos equipos inscritos antes de programar partidos. (Regla 5)', 'error');
        return;
    }

    // REGLA DE NEGOCIO 1: No programar dos partidos en la misma sede el mismo día y hora
    const venueConflict = state.matches.some(m => m.venueId === venueId && m.date === date && m.time === time);
    if (venueConflict) {
        const venueName = state.venues.find(v => v.id === venueId)?.name || 'sede';
        showToast(`Error de Negocio: La sede "${venueName}" ya tiene un partido programado el ${date} a las ${time}. (Regla 1)`, 'error');
        return;
    }

    // REGLA DE NEGOCIO 2: Un equipo no puede jugar dos partidos el mismo día dentro del mismo torneo
    const localConflict = state.matches.some(m =>
        m.tournamentId === tournamentId &&
        m.date === date &&
        (m.localTeamId === localTeamId || m.visitorTeamId === localTeamId)
    );
    if (localConflict) {
        const tName = state.teams.find(t => t.id === localTeamId)?.name;
        showToast(`Error de Negocio: El equipo local (${tName}) ya juega otro partido este mismo día en este torneo. (Regla 2)`, 'error');
        return;
    }

    const visitorConflict = state.matches.some(m =>
        m.tournamentId === tournamentId &&
        m.date === date &&
        (m.localTeamId === visitorTeamId || m.visitorTeamId === visitorTeamId)
    );
    if (visitorConflict) {
        const tName = state.teams.find(t => t.id === visitorTeamId)?.name;
        showToast(`Error de Negocio: El equipo visitante (${tName}) ya juega otro partido este mismo día en este torneo. (Regla 2)`, 'error');
        return;
    }

    // Todo correcto, insertar partido
    const newMatch = {
        id: state.matches.length + 1,
        tournamentId,
        localTeamId,
        visitorTeamId,
        venueId,
        date,
        time,
        localGoals: null,
        visitorGoals: null,
        state: 'Programado'
    };

    state.matches.push(newMatch);
    closeModal('matchModal');
    document.getElementById('matchForm').reset();
    showToast('Partido programado exitosamente.', 'success');
    renderAll();
}

// Cargar Marcador Modal
function openScoreModal(matchId) {
    const match = state.matches.find(m => m.id === matchId);
    if (!match) return;

    document.getElementById('scoreMatchId').value = match.id;
    document.getElementById('scoreLocalName').textContent = state.teams.find(t => t.id === match.localTeamId)?.name || 'Local';
    document.getElementById('scoreVisitorName').textContent = state.teams.find(t => t.id === match.visitorTeamId)?.name || 'Visitante';
    document.getElementById('scoreLocalGoals').value = match.localGoals !== null ? match.localGoals : '';
    document.getElementById('scoreVisitorGoals').value = match.visitorGoals !== null ? match.visitorGoals : '';
    document.getElementById('scoreMatchState').value = match.state;

    openModal('scoreModal');
}

// Actualizar Marcador (REGLA DE NEGOCIO 4)
function handleUpdateScore(e) {
    e.preventDefault();
    const matchId = parseInt(document.getElementById('scoreMatchId').value);
    const localGoals = parseInt(document.getElementById('scoreLocalGoals').value);
    const visitorGoals = parseInt(document.getElementById('scoreVisitorGoals').value);
    const matchState = document.getElementById('scoreMatchState').value;

    const match = state.matches.find(m => m.id === matchId);
    if (!match) return;

    // REGLA DE NEGOCIO 4: Solo registrar resultados de partidos programados o en juego
    if (match.state === 'Cancelado') {
        showToast('Error de Negocio: No se pueden registrar marcadores de partidos cancelados. (Regla 4)', 'error');
        return;
    }

    // Actualizar datos
    match.localGoals = isNaN(localGoals) ? null : localGoals;
    match.visitorGoals = isNaN(visitorGoals) ? null : visitorGoals;
    match.state = matchState;

    closeModal('scoreModal');
    showToast('Marcador actualizado y posiciones recalculadas.', 'success');
    renderAll();
}

// ==========================================
// 8. ACCIONES DE ELIMINACIÓN (CRUD DELETE)
// ==========================================
function handleDeleteTeam(teamId) {
    if (confirm('¿Está seguro de eliminar este equipo? Se borrarán sus inscripciones asociadas.')) {
        state.teams = state.teams.filter(t => t.id !== teamId);
        state.teamsTournaments = state.teamsTournaments.filter(et => et.teamId !== teamId);
        state.playerRegistrations = state.playerRegistrations.filter(pr => pr.teamId !== teamId);
        showToast('Equipo eliminado.', 'warning');
        renderAll();
    }
}

function handleDeletePlayer(playerId) {
    if (confirm('¿Desea desvincular al jugador del sistema?')) {
        state.players = state.players.filter(p => p.id !== playerId);
        state.playerRegistrations = state.playerRegistrations.filter(pr => pr.playerId !== playerId);
        showToast('Jugador desvinculado.', 'warning');
        renderAll();
    }
}

function handleDeleteVenue(venueId) {
    if (confirm('¿Desea eliminar la sede deportiva?')) {
        state.venues = state.venues.filter(v => v.id !== venueId);
        showToast('Sede deportiva eliminada.', 'warning');
        renderAll();
    }
}

// ==========================================
// 9. MOTOR DINÁMICO DE CLASIFICACIÓN (TABLA DE POSICIONES)
// ==========================================
function calculateStandings(tournamentId) {
    // 1. Obtener equipos inscritos en el torneo
    const enrolledTeamIds = state.teamsTournaments
        .filter(et => et.tournamentId === tournamentId)
        .map(et => et.teamId);

    const standings = enrolledTeamIds.map(teamId => {
        const teamName = state.teams.find(t => t.id === teamId)?.name || 'Equipo';
        return {
            id: teamId,
            name: teamName,
            pj: 0,
            pg: 0,
            pe: 0,
            pp: 0,
            gf: 0,
            gc: 0,
            dg: 0,
            pts: 0
        };
    });

    // 2. Procesar partidos finalizados de este torneo
    const finishedMatches = state.matches.filter(m => m.tournamentId === tournamentId && m.state === 'Finalizado');

    finishedMatches.forEach(m => {
        const local = standings.find(s => s.id === m.localTeamId);
        const visitor = standings.find(s => s.id === m.visitorTeamId);

        if (local && visitor) {
            local.pj++;
            visitor.pj++;

            local.gf += m.localGoals;
            local.gc += m.visitorGoals;
            visitor.gf += m.visitorGoals;
            visitor.gc += m.localGoals;

            if (m.localGoals > m.visitorGoals) {
                local.pg++;
                local.pts += 3;
                visitor.pp++;
            } else if (m.localGoals < m.visitorGoals) {
                visitor.pg++;
                visitor.pts += 3;
                local.pp++;
            } else {
                local.pe++;
                local.pts += 1;
                visitor.pe++;
                visitor.pts += 1;
            }
        }
    });

    // 3. Calcular diferencia de goles y ordenar
    standings.forEach(s => {
        s.dg = s.gf - s.gc;
    });

    // Criterios de ordenamiento: PTS desc, DG desc, GF desc, Nombre asc
    return standings.sort((a, b) => {
        if (b.pts !== a.pts) return b.pts - a.pts;
        if (b.dg !== a.dg) return b.dg - a.dg;
        if (b.gf !== a.gf) return b.gf - a.gf;
        return a.name.localeCompare(b.name);
    });
}

function loadStandingsTable() {
    const tournamentId = parseInt(document.getElementById('standingsTournamentSelect').value);
    const standings = calculateStandings(tournamentId);

    const tbody = document.getElementById('standingsTable').querySelector('tbody');
    if (standings.length === 0) {
        tbody.innerHTML = `<tr><td colspan="10" class="text-center text-muted">No hay equipos inscritos en este torneo.</td></tr>`;
        return;
    }

    tbody.innerHTML = standings.map((s, index) => {
        const team = state.teams.find(t => t.name === s.name);
        const teamColor = team ? (team.color || '#10b981') : '#10b981';
        return `
            <tr>
                <td><strong>${index + 1}</strong></td>
                <td style="white-space: nowrap;">
                    <span class="team-color-dot" style="background-color: ${teamColor}; box-shadow: 0 0 6px ${teamColor};"></span>
                    <strong>${s.name}</strong>
                </td>
                <td>${s.pj}</td>
                <td>${s.pg}</td>
                <td>${s.pe}</td>
                <td>${s.pp}</td>
                <td>${s.gf}</td>
                <td>${s.gc}</td>
                <td>${s.dg >= 0 ? '+' + s.dg : s.dg}</td>
                <td class="text-primary font-bold">${s.pts}</td>
            </tr>
        `;
    }).join('');
}

// ==========================================
// 10. SIMULADOR CONSOLA SQL
// ==========================================
function loadSQLQuery(key) {
    selectedQueryKey = key;
    document.querySelectorAll('.sql-queries-list li').forEach((li, idx) => {
        const queryKeys = ['partidos_sedes', 'partidos_torneo', 'partidos_fecha', 'partidos_equipo', 'jugadores_equipo', 'equipos_torneo', 'resultados', 'tabla_posiciones'];
        if (queryKeys[idx] === key) {
            li.classList.add('active');
        } else {
            li.classList.remove('active');
        }
    });

    document.getElementById('sqlQueryTextarea').value = sqlQueries[key];
    document.getElementById('sqlQueryResultContainer').innerHTML = `<p class="text-muted">Editor listo. Haz clic en "Ejecutar Consulta".</p>`;
}

function executeSimulatedQuery() {
    const container = document.getElementById('sqlQueryResultContainer');
    container.innerHTML = `<span class="text-muted">Procesando consulta...</span>`;

    setTimeout(() => {
        let headers = [];
        let rows = [];

        switch (selectedQueryKey) {
            case 'partidos_sedes':
                headers = ['id_partido', 'torneo', 'equipo_local', 'equipo_visitante', 'sede', 'fecha', 'hora', 'estado'];
                rows = state.matches.map(m => [
                    m.id,
                    state.tournaments.find(t => t.id === m.tournamentId)?.name.substring(0, 15) + '...',
                    state.teams.find(t => t.id === m.localTeamId)?.name,
                    state.teams.find(t => t.id === m.visitorTeamId)?.name,
                    state.venues.find(v => v.id === m.venueId)?.name.substring(0, 15) + '...',
                    m.date,
                    m.time,
                    m.state
                ]);
                break;
            case 'partidos_torneo':
                headers = ['id_partido', 'equipo_local', 'equipo_visitante', 'sede', 'fecha', 'hora', 'estado'];
                rows = state.matches
                    .filter(m => m.tournamentId === 1)
                    .map(m => [
                        m.id,
                        state.teams.find(t => t.id === m.localTeamId)?.name,
                        state.teams.find(t => t.id === m.visitorTeamId)?.name,
                        state.venues.find(v => v.id === m.venueId)?.name.substring(0, 15) + '...',
                        m.date,
                        m.time,
                        m.state
                    ]);
                break;
            case 'partidos_fecha':
                headers = ['id_partido', 'torneo', 'equipo_local', 'equipo_visitante', 'sede', 'hora', 'estado'];
                rows = state.matches
                    .filter(m => m.date === '2026-06-08')
                    .map(m => [
                        m.id,
                        state.tournaments.find(t => t.id === m.tournamentId)?.name.substring(0, 15) + '...',
                        state.teams.find(t => t.id === m.localTeamId)?.name,
                        state.teams.find(t => t.id === m.visitorTeamId)?.name,
                        state.venues.find(v => v.id === m.venueId)?.name.substring(0, 15) + '...',
                        m.time,
                        m.state
                    ]);
                break;
            case 'partidos_equipo':
                headers = ['id_partido', 'torneo', 'equipo_local', 'goles_local', 'goles_visitante', 'equipo_visitante', 'sede', 'fecha', 'estado'];
                rows = state.matches
                    .filter(m => m.localTeamId === 1 || m.visitorTeamId === 1)
                    .map(m => [
                        m.id,
                        state.tournaments.find(t => t.id === m.tournamentId)?.name.substring(0, 15) + '...',
                        state.teams.find(t => t.id === m.localTeamId)?.name,
                        m.localGoals !== null ? m.localGoals : 'NULL',
                        m.visitorGoals !== null ? m.visitorGoals : 'NULL',
                        state.teams.find(t => t.id === m.visitorTeamId)?.name,
                        state.venues.find(v => v.id === m.venueId)?.name.substring(0, 15) + '...',
                        m.date,
                        m.state
                    ]);
                break;
            case 'jugadores_equipo':
                headers = ['id_jugador', 'documento_identidad', 'nombre', 'apellido', 'posicion', 'fecha_nacimiento', 'fecha_registro'];
                const pIds = state.playerRegistrations
                    .filter(pr => pr.teamId === 2 && pr.tournamentId === 1)
                    .map(pr => pr.playerId);
                rows = state.players
                    .filter(p => pIds.includes(p.id))
                    .map(p => [
                        p.id,
                        p.doc,
                        p.name,
                        p.lastName,
                        p.position || 'Mediocampista',
                        p.birthDate,
                        '2026-06-09'
                    ]);
                break;
            case 'equipos_torneo':
                headers = ['id_equipo', 'nombre_equipo', 'representante', 'contacto', 'color', 'fecha_inscripcion'];
                const tIds = state.teamsTournaments
                    .filter(et => et.tournamentId === 1)
                    .map(et => et.teamId);
                rows = state.teams
                    .filter(t => tIds.includes(t.id))
                    .map(t => [
                        t.id,
                        t.name,
                        t.representative,
                        t.contact || 'NULL',
                        t.color || '#10b981',
                        '2026-06-09'
                    ]);
                break;
            case 'resultados':
                headers = ['id_partido', 'torneo', 'equipo_local', 'goles_local', 'goles_visitante', 'equipo_visitante', 'nombre_sede', 'fecha'];
                rows = state.matches
                    .filter(m => m.state === 'Finalizado')
                    .map(m => [
                        m.id,
                        state.tournaments.find(t => t.id === m.tournamentId)?.name.substring(0, 15) + '...',
                        state.teams.find(t => t.id === m.localTeamId)?.name,
                        m.localGoals,
                        m.visitorGoals,
                        state.teams.find(t => t.id === m.visitorTeamId)?.name,
                        state.venues.find(v => v.id === m.venueId)?.name.substring(0, 15) + '...',
                        m.date
                    ]);
                break;
            case 'tabla_posiciones':
                headers = ['posicion', 'equipo', 'PJ', 'PG', 'PE', 'PP', 'GF', 'GC', 'DG', 'PTS'];
                rows = calculateStandings(1).map((s, index) => [
                    index + 1,
                    s.name,
                    s.pj,
                    s.pg,
                    s.pe,
                    s.pp,
                    s.gf,
                    s.gc,
                    s.dg,
                    s.pts
                ]);
                break;
        }

        // Renderizar tabla HTML del resultado
        let tableHTML = `<table class="table">
            <thead>
                <tr>
                    ${headers.map(h => `<th>${h}</th>`).join('')}
                </tr>
            </thead>
            <tbody>
                ${rows.map(row => `
                    <tr>
                        ${row.map(val => `<td>${val}</td>`).join('')}
                    </tr>
                `).join('')}
            </tbody>
        </table>`;

        container.innerHTML = tableHTML;
        showToast('Consulta simulada con éxito.', 'success');
    }, 400);
}

// ==========================================
// 11. PESTAÑAS DEL CENTRO DE DOCUMENTACIÓN
// ==========================================
function switchDocTab(tabId) {
    document.querySelectorAll('.doc-tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelectorAll('.doc-tab-panel').forEach(panel => {
        panel.classList.remove('active');
    });

    // Activar botón y panel
    const btn = document.querySelector(`.doc-tab-btn[onclick="switchDocTab('${tabId}')"]`);
    if (btn) btn.classList.add('active');

    const panel = document.getElementById(`doc-tab-${tabId}`);
    if (panel) panel.classList.add('active');
}

// ==========================================
// 12. TOAST Y NOTIFICACIONES
// ==========================================
function showToast(message, type = 'success') {
    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;

    let icon = '✔️';
    if (type === 'error') icon = '❌';
    if (type === 'warning') icon = '⚠️';

    toast.innerHTML = `
        <div style="display: flex; align-items: center; gap: 8px;">
            <span>${icon}</span>
            <span>${message}</span>
        </div>
        <span class="toast-close" onclick="this.parentElement.remove()">&times;</span>
    `;

    container.appendChild(toast);

    // Auto remover en 5 segundos
    setTimeout(() => {
        if (toast.parentElement) {
            toast.remove();
        }
    }, 5000);
}

// ==========================================
// 13. FUNCIONES DE MEJORA UX Y EXPORTACIÓN
// ==========================================
function handleGlobalSearch(e) {
    const query = e.target.value.toLowerCase().trim();
    const activeSection = document.querySelector('.content-section.active');
    if (!activeSection) return;

    const tableRows = activeSection.querySelectorAll('tbody tr');
    tableRows.forEach(row => {
        // Ignorar la fila de sin resultados
        if (row.cells.length === 1 && row.querySelector('.text-muted')) return;

        const rowText = row.textContent.toLowerCase();
        if (rowText.includes(query)) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
}

function exportStandingsToCSV() {
    const tournamentId = parseInt(document.getElementById('standingsTournamentSelect').value);
    const tournamentName = state.tournaments.find(t => t.id === tournamentId)?.name || 'torneo';
    const standings = calculateStandings(tournamentId);

    if (standings.length === 0) {
        showToast('No hay datos para exportar.', 'warning');
        return;
    }

    let csvContent = "data:text/csv;charset=utf-8,\uFEFF"; // BOM para Excel
    csvContent += "Posición,Equipo,PJ,PG,PE,PP,GF,GC,DG,Puntos\n";

    standings.forEach((s, idx) => {
        csvContent += `${idx + 1},"${s.name}",${s.pj},${s.pg},${s.pe},${s.pp},${s.gf},${s.gc},${s.dg},${s.pts}\n`;
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Posiciones_${tournamentName.replace(/\s+/g, '_')}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Tabla de posiciones exportada a CSV.', 'success');
}

function exportMatchesToCSV() {
    const tournamentId = parseInt(document.getElementById('filterMatchTournament').value);
    const tournamentName = state.tournaments.find(t => t.id === tournamentId)?.name || 'torneo';
    const filteredMatches = state.matches.filter(m => m.tournamentId === tournamentId);

    if (filteredMatches.length === 0) {
        showToast('No hay partidos para exportar.', 'warning');
        return;
    }

    let csvContent = "data:text/csv;charset=utf-8,\uFEFF"; // BOM
    csvContent += "Fecha,Hora,Sede,Equipo Local,Goles Local,Goles Visitante,Equipo Visitante,Estado\n";

    filteredMatches.forEach(m => {
        const loc = state.teams.find(t => t.id === m.localTeamId)?.name || 'L';
        const vis = state.teams.find(t => t.id === m.visitorTeamId)?.name || 'V';
        const venue = state.venues.find(v => v.id === m.venueId)?.name || 'Sede';
        const localG = m.localGoals !== null ? m.localGoals : '';
        const visitorG = m.visitorGoals !== null ? m.visitorGoals : '';
        csvContent += `${m.date},${m.time},"${venue.replace(/"/g, '""')}","${loc.replace(/"/g, '""')}",${localG},${visitorG},"${vis.replace(/"/g, '""')}",${m.state}\n`;
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Fixture_${tournamentName.replace(/\s+/g, '_')}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Fixture exportado a CSV.', 'success');
}

// ==========================================
// 14. LOGICA Y RENDER DEL CALENDARIO
// ==========================================
function renderCalendar() {
    const grid = document.getElementById('calendarDaysGrid');
    const title = document.getElementById('calendarMonthTitle');
    if (!grid || !title) return;

    const year = currentCalendarDate.getFullYear();
    const month = currentCalendarDate.getMonth();
    const monthNames = [
        "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
        "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];

    title.textContent = `${monthNames[month]} ${year}`;
    grid.innerHTML = '';

    const firstDayIndex = new Date(year, month, 1).getDay();
    const totalDays = new Date(year, month + 1, 0).getDate();
    const prevTotalDays = new Date(year, month, 0).getDate();

    // Días del mes anterior
    for (let i = firstDayIndex - 1; i >= 0; i--) {
        const dayNum = prevTotalDays - i;
        const dayCell = document.createElement('div');
        dayCell.className = 'calendar-day other-month';
        dayCell.innerHTML = `<div class="calendar-day-number">${dayNum}</div>`;
        grid.appendChild(dayCell);
    }

    // Días del mes actual
    const today = new Date();
    for (let day = 1; day <= totalDays; day++) {
        const dayCell = document.createElement('div');
        dayCell.className = 'calendar-day';

        if (today.getFullYear() === year && today.getMonth() === month && today.getDate() === day) {
            dayCell.classList.add('today');
        }

        const monthStr = String(month + 1).padStart(2, '0');
        const dayStr = String(day).padStart(2, '0');
        const dateStr = `${year}-${monthStr}-${dayStr}`;
        const dayMatches = state.matches.filter(m => m.date === dateStr);

        let eventsHTML = '';
        if (dayMatches.length > 0) {
            eventsHTML = `<div class="calendar-day-events">`;
            dayMatches.forEach(m => {
                const locTeam = state.teams.find(t => t.id === m.localTeamId);
                const visTeam = state.teams.find(t => t.id === m.visitorTeamId);
                const loc = locTeam ? locTeam.name : 'L';
                const vis = visTeam ? visTeam.name : 'V';
                const locColor = locTeam ? (locTeam.color || '#10b981') : '#10b981';

                const locShort = loc.split(' ').slice(0, 2).map(w => w[0]).join('').substring(0, 3).toUpperCase();
                const visShort = vis.split(' ').slice(0, 2).map(w => w[0]).join('').substring(0, 3).toUpperCase();
                const score = m.state === 'Finalizado' ? ` (${m.localGoals}-${m.visitorGoals})` : '';
                const titleTooltip = `${loc} vs ${vis} en ${state.venues.find(v => v.id === m.venueId)?.name || 'Sede'} a las ${m.time}`;

                eventsHTML += `
                    <div class="calendar-event-badge ${m.state.toLowerCase()}" 
                         style="border-left-color: ${locColor} !important;"
                         title="${titleTooltip}" 
                         onclick="handleCalendarEventClick(${m.id})">
                        ${m.time} ${locShort} vs ${visShort}${score}
                    </div>
                `;
            });
            eventsHTML += `</div>`;
        }

        dayCell.innerHTML = `
            <div class="calendar-day-number">${day}</div>
            ${eventsHTML}
        `;
        grid.appendChild(dayCell);
    }

    // Días del mes siguiente
    const totalCells = grid.children.length;
    const remainingCells = 42 - totalCells;
    for (let i = 1; i <= remainingCells; i++) {
        const dayCell = document.createElement('div');
        dayCell.className = 'calendar-day other-month';
        dayCell.innerHTML = `<div class="calendar-day-number">${i}</div>`;
        grid.appendChild(dayCell);
    }
}

function handleCalendarEventClick(matchId) {
    const isPlanilleroOrAdmin = state.currentUser && (state.currentUser.role === 'Admin' || state.currentUser.role === 'Planillero');
    if (isPlanilleroOrAdmin) {
        openScoreModal(matchId);
    } else {
        const m = state.matches.find(match => match.id === matchId);
        if (!m) return;
        const loc = state.teams.find(t => t.id === m.localTeamId)?.name || 'Local';
        const vis = state.teams.find(t => t.id === m.visitorTeamId)?.name || 'Visitante';
        const venue = state.venues.find(v => v.id === m.venueId)?.name || 'Sede';
        const score = m.state === 'Finalizado' ? `${m.localGoals} - ${m.visitorGoals}` : 'VS';
        alert(`Partido: ${loc} ${score} ${vis}\nFecha: ${m.date}\nHora: ${m.time}\nSede: ${venue}\nEstado: ${m.state}`);
    }
}
