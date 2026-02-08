// Theme management utility
export type Theme = 'light' | 'dark';

export const getTheme = (): Theme => {
  const stored = localStorage.getItem('theme');
  if (stored === 'dark' || stored === 'light') {
    return stored;
  }
  return 'light';
};

export const setTheme = (theme: Theme) => {
  localStorage.setItem('theme', theme);
  if (theme === 'dark') {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
  // Dispatch custom event for other components to listen
  window.dispatchEvent(new Event('themechange'));
};

export const toggleTheme = (): Theme => {
  const current = getTheme();
  const next = current === 'light' ? 'dark' : 'light';
  setTheme(next);
  return next;
};

// Initialize theme on app load
export const initializeTheme = () => {
  const theme = getTheme();
  setTheme(theme);
};
