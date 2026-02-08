// Language management utility
export type Language = 'en' | 'es';

const translations: Record<Language, Record<string, string>> = {
  en: {
    'header.findRoom': 'Find a Room',
    'header.listRoom': 'List a Room',
    'header.roommateGroups': 'Roommate Groups',
    'header.dashboard': 'Dashboard',
    'header.logout': 'Logout',
    'header.login': 'Login',
    'header.signup': 'Sign Up',
    'header.profile': 'Profile',
    'findRoom.title': 'Find Your Perfect Room',
    'findRoom.subtitle': 'Search and filter rooms based on your preferences',
    'findRoom.searchPreferences': 'Search Preferences',
    'findRoom.location': 'Preferred Location',
    'findRoom.minBudget': 'Min Budget ($)',
    'findRoom.maxBudget': 'Max Budget ($)',
    'findRoom.paymentType': 'Payment Type',
    'findRoom.roomType': 'Room Type',
    'findRoom.capacity': 'Number of Roommates',
    'findRoom.studentFriendly': 'Student/Working',
    'findRoom.smoking': 'Smoking Preference',
    'findRoom.food': 'Food Preference',
    'findRoom.social': 'Social Preference',
    'findRoom.gender': 'Gender Preference',
    'findRoom.resetFilters': 'Reset Filters',
    'findRoom.availableRooms': 'Available Rooms',
    'findRoom.noRooms': 'No rooms found matching your preferences. Try adjusting your filters.',
    'findRoom.contactOwner': 'Contact Owner',
    'gender.male': 'Male',
    'gender.female': 'Female',
    'gender.any': 'Any',
  },
  es: {
    'header.findRoom': 'Buscar Habitación',
    'header.listRoom': 'Listar Habitación',
    'header.roommateGroups': 'Grupos de Compañeros',
    'header.dashboard': 'Panel de Control',
    'header.logout': 'Cerrar Sesión',
    'header.login': 'Iniciar Sesión',
    'header.signup': 'Registrarse',
    'header.profile': 'Perfil',
    'findRoom.title': 'Encuentra Tu Habitación Perfecta',
    'findRoom.subtitle': 'Busca y filtra habitaciones según tus preferencias',
    'findRoom.searchPreferences': 'Preferencias de Búsqueda',
    'findRoom.location': 'Ubicación Preferida',
    'findRoom.minBudget': 'Presupuesto Mínimo ($)',
    'findRoom.maxBudget': 'Presupuesto Máximo ($)',
    'findRoom.paymentType': 'Tipo de Pago',
    'findRoom.roomType': 'Tipo de Habitación',
    'findRoom.capacity': 'Número de Compañeros',
    'findRoom.studentFriendly': 'Estudiante/Profesional',
    'findRoom.smoking': 'Preferencia de Fumar',
    'findRoom.food': 'Preferencia de Comida',
    'findRoom.social': 'Preferencia Social',
    'findRoom.gender': 'Preferencia de Género',
    'findRoom.resetFilters': 'Restablecer Filtros',
    'findRoom.availableRooms': 'Habitaciones Disponibles',
    'findRoom.noRooms': 'No se encontraron habitaciones que coincidan con tus preferencias. Intenta ajustar tus filtros.',
    'findRoom.contactOwner': 'Contactar Propietario',
    'gender.male': 'Masculino',
    'gender.female': 'Femenino',
    'gender.any': 'Cualquiera',
  },
};

export const getLanguage = (): Language => {
  const stored = localStorage.getItem('language');
  if (stored === 'en' || stored === 'es') {
    return stored;
  }
  return 'en';
};

export const setLanguage = (language: Language) => {
  localStorage.setItem('language', language);
};

export const t = (key: string, language?: Language): string => {
  const lang = language || getLanguage();
  return translations[lang]?.[key] || key;
};

export const toggleLanguage = (): Language => {
  const current = getLanguage();
  const next = current === 'en' ? 'es' : 'en';
  setLanguage(next);
  return next;
};
