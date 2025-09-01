'use client';

import { useEffect } from 'react';

export default function ThemeScript() {
  useEffect(() => {
    // Appliquer le thème immédiatement pour éviter le flash
    const savedTheme = localStorage.getItem('theme');
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    const theme = savedTheme || systemTheme;

    // Appliquer le thème au document
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);
  }, []);

  return null;
}
