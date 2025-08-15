/**
 * NAVIGATION SYSTEM - Sistema de Navegación
 * Maneja toda la navegación entre páginas del sistema de inspecciones
 */

// Configuración de rutas del sistema
const ROUTES = {
    dashboard: 'VISITANTES.html',
    login: 'login-{attraction}.html',
    inspection: 'inspeccion-{attraction}.html'
};

// Información de todas las atracciones
const ATTRACTIONS_DATA = {
    'montana-rusa': {
        name: 'Montaña Rusa',
        icon: '🎢',
        loginCredentials: { username: 'montana_admin', password: 'MR2024$ecure' }
    },
    'rueda-fortuna': {
        name: 'Rueda de la Fortuna',
        icon: '🎡',
        loginCredentials: { username: 'rueda_admin', password: 'RF2024$pin' }
    },
    'carrusel': {
        name: 'Carrusel Mágico',
        icon: '🎠',
        loginCredentials: { username: 'carrusel_admin', password: 'CM2024$agic' }
    },
    'casa-terror': {
        name: 'Casa del Terror',
        icon: '👻',
        loginCredentials: { username: 'terror_admin', password: 'CT2024$pook' }
    },
    'bumper-cars': {
        name: 'Carros Chocones',
        icon: '🚗',
        loginCredentials: { username: 'bumper_admin', password: 'BC2024$rash' }
    },
    'barcos-piratas': {
        name: 'Barcos Piratas',
        icon: '🚢',
        loginCredentials: { username: 'pirata_admin', password: 'BP2024$hip' }
    },
    'tobogan-gigante': {
        name: 'Tobogán Gigante',
        icon: '🛝',
        loginCredentials: { username: 'tobogan_admin', password: 'TG2024$lide' }
    },
    'tren-fantasma': {
        name: 'Tren Fantasma',
        icon: '🚂',
        loginCredentials: { username: 'tren_admin', password: 'TF2024$host' }
    },
    'laberinto': {
        name: 'Laberinto de Maíz',
        icon: '🌽',
        loginCredentials: { username: 'maze_admin', password: 'LM2024$orn' }
    },
    'sillas-voladoras': {
        name: 'Sillas Voladoras',
        icon: '🪑',
        loginCredentials: { username: 'sillas_admin', password: 'SV2024$ly' }
    },
    'rio-rapidos': {
        name: 'Río de Rápidos',
        icon: '🌊',
        loginCredentials: { username: 'rio_admin', password: 'RR2024$ater' }
    },
    'torre-caida': {
        name: 'Torre de Caída',
        icon: '🗼',
        loginCredentials: { username: 'torre_admin', password: 'TC2024$all' }
    },
    'simulador-4d': {
        name: 'Simulador 4D',
        icon: '🎬',
        loginCredentials: { username: 'sim4d_admin', password: 'S4D2024$im' }
    },
    'tirolesa': {
        name: 'Tirolesa Extrema',
        icon: '🪁',
        loginCredentials: { username: 'tirolesa_admin', password: 'TE2024$ip' }
    },
    'piscina-pelotas': {
        name: 'Piscina de Pelotas',
        icon: '⚽',
        loginCredentials: { username: 'piscina_admin', password: 'PP2024$all' }
    }
};

// Clase para manejar la navegación
class NavigationSystem {
    constructor() {
        this.currentPage = this.getCurrentPage();
        this.sessionData = this.loadSessionData();
        this.init();
    }

    // Inicializar el sistema de navegación
    init() {
        console.log(`🧭 NavigationSystem iniciado en: ${this.currentPage}`);
        this.setupGlobalHandlers();
    }

    // Obtener la página actual
    getCurrentPage() {
        const path = window.location.pathname;
        const fileName = path.substring(path.lastIndexOf('/') + 1);
        
        if (fileName === 'VISITANTES.html' || fileName === '') {
            return 'dashboard';
        } else if (fileName.startsWith('login-')) {
            return 'login';
        } else if (fileName.startsWith('inspeccion-')) {
            return 'inspection';
        }
        
        return 'unknown';
    }

    // Cargar datos de sesión
    loadSessionData() {
        return {
            selectedAttraction: sessionStorage.getItem('selectedAttraction'),
            loggedIn: sessionStorage.getItem('loggedIn') === 'true',
            loginTime: sessionStorage.getItem('loginTime'),
            navigationSource: sessionStorage.getItem('navigationSource')
        };
    }

    // Navegar al dashboard
    goToDashboard() {
        console.log('🏠 Navegando al dashboard...');
        window.location.href = ROUTES.dashboard;
    }

    // Navegar al login de una atracción
    goToLogin(attractionId) {
        if (!this.isValidAttraction(attractionId)) {
            console.error(`❌ Atracción inválida: ${attractionId}`);
            return false;
        }

        console.log(`🔐 Navegando al login de: ${attractionId}`);
        
        // Guardar información de navegación
        sessionStorage.setItem('selectedAttraction', attractionId);
        sessionStorage.setItem('navigationSource', 'dashboard');
        
        const loginUrl = ROUTES.login.replace('{attraction}', attractionId);
        window.location.href = loginUrl;
        
        return true;
    }

    // Navegar a la inspección (después del login)
    goToInspection(attractionId) {
        if (!this.isValidAttraction(attractionId)) {
            console.error(`❌ Atracción inválida: ${attractionId}`);
            return false;
        }

        if (!this.sessionData.loggedIn) {
            console.warn('⚠️  Usuario no autenticado. Redirigiendo al login...');
            this.goToLogin(attractionId);
            return false;
        }

        console.log(`📋 Navegando a inspección de: ${attractionId}`);
        
        const inspectionUrl = ROUTES.inspection.replace('{attraction}', attractionId);
        window.location.href = inspectionUrl;
        
        return true;
    }

    // Validar si la atracción existe
    isValidAttraction(attractionId) {
        return attractionId && ATTRACTIONS_DATA.hasOwnProperty(attractionId);
    }

    // Obtener información de una atracción
    getAttractionData(attractionId) {
        return ATTRACTIONS_DATA[attractionId] || null;
    }

    // Configurar manejadores globales
    setupGlobalHandlers() {
        // Manejador para teclas de navegación global
        document.addEventListener('keydown', (e) => {
            // ESC para volver al dashboard
            if (e.key === 'Escape' && this.currentPage !== 'dashboard') {
                if (confirm('¿Deseas volver al dashboard principal?')) {
                    this.goToDashboard();
                }
            }
            
            // F5 personalizado para recargar con confirmación en login/inspección
            if (e.key === 'F5' && this.currentPage !== 'dashboard') {
                e.preventDefault();
                if (confirm('¿Deseas recargar la página? Perderás los datos no guardados.')) {
                    window.location.reload();
                }
            }
        });

        // Prevenir navegación accidental
        window.addEventListener('beforeunload', (e) => {
            if (this.currentPage === 'inspection') {
                e.preventDefault();
                e.returnValue = '¿Estás seguro? Podrías perder los datos de la inspección.';
                return e.returnValue;
            }
        });
    }

    // Limpiar sesión (logout)
    clearSession() {
        sessionStorage.removeItem('loggedIn');
        sessionStorage.removeItem('attraction');
        sessionStorage.removeItem('loginTime');
        sessionStorage.removeItem('selectedAttraction');
        sessionStorage.removeItem('navigationSource');
        
        console.log('🧹 Sesión limpiada');
    }

    // Verificar si el usuario está autenticado para una atracción
    isAuthenticatedFor(attractionId) {
        return this.sessionData.loggedIn && 
               this.sessionData.selectedAttraction === attractionId;
    }

    // Obtener todas las atracciones
    getAllAttractions() {
        return Object.keys(ATTRACTIONS_DATA);
    }

    // Generar breadcrumb de navegación
    getBreadcrumb() {
        const breadcrumb = ['Dashboard'];
        
        if (this.sessionData.selectedAttraction) {
            const attraction = this.getAttractionData(this.sessionData.selectedAttraction);
            if (attraction) {
                breadcrumb.push(attraction.name);
                
                if (this.currentPage === 'login') {
                    breadcrumb.push('Login');
                } else if (this.currentPage === 'inspection') {
                    breadcrumb.push('Inspección');
                }
            }
        }
        
        return breadcrumb;
    }
}

// Instancia global del sistema de navegación
const NavigationManager = new NavigationSystem();

// Hacer disponible globalmente
window.NavigationManager = NavigationManager;
window.ATTRACTIONS_DATA = ATTRACTIONS_DATA;

// Funciones de conveniencia globales
window.goToDashboard = () => NavigationManager.goToDashboard();
window.goToLogin = (id) => NavigationManager.goToLogin(id);
window.goToInspection = (id) => NavigationManager.goToInspection(id);