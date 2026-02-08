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
  // Update document element with theme class
  document.documentElement.setAttribute('data-theme', theme);
  document.documentElement.classList.remove('dark', 'light');
  document.documentElement.classList.add(theme);
  // Force a repaint to ensure smooth transition
  document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
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
  document.documentElement.setAttribute('data-theme', theme);
  document.documentElement.classList.add(theme);
  window.dispatchEvent(new Event('themechange'));
};
