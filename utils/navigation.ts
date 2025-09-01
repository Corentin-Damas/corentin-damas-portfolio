/**
 * Navigation utilities for improved route handling
 */

/**
 * Check if the current path matches a route (including sub-routes)
 * This is more intelligent than simple equality check for nested paths
 *
 * @param currentPath The current path (from usePathname)
 * @param routePath The route to check against
 * @param exact Whether to check for exact match (default: false)
 * @returns Whether the current path matches the route
 */
export function isActiveRoute(currentPath: string, routePath: string, exact = false): boolean {
  if (!currentPath) return false;

  if (exact) {
    return currentPath === routePath;
  }

  // Special case for home page
  if (routePath === '/' && currentPath === '/') {
    return true;
  }

  // Handle nested routes (for example /gallery should match /gallery/project)
  if (routePath !== '/' && currentPath.startsWith(routePath)) {
    // Check if it's a direct child route or deeper nesting
    // e.g., /gallery matches /gallery/project but not /gallery-other
    const remainingPath = currentPath.slice(routePath.length);
    return remainingPath === '' || remainingPath.startsWith('/');
  }

  return false;
}

/**
 * Get the depth level of a path
 *
 * @param path The path to check
 * @returns The depth level (0 for home, 1 for first level, etc.)
 */
export function getPathDepth(path: string): number {
  if (!path || path === '/') return 0;
  return path.split('/').filter(Boolean).length;
}

/**
 * Routes configuration for the application
 * This centralizes all route information
 */
export const routes = {
  home: {
    path: '/',
    label: 'Home',
  },
  gallery: {
    path: '/gallery',
    label: 'Gallery',
    children: {
      tsuzukitai: {
        path: '/gallery/tsuzukitai',
        label: 'Trapped memories',
        id: '1',
        category: 'Projects',
      },
      yearInJapan: {
        path: '/gallery/a_year_in_japan',
        label: 'A year in japan',
        id: '2',
        category: 'Projects',
      },
      morningShadows: {
        path: '/gallery/morning_shadows',
        label: 'Morning Shadows',
        id: '3',
        category: 'Projects',
      },
      museums: {
        path: '/gallery/museums',
        label: 'Museums',
        id: '4',
        category: 'Projects',
      },
      earthAndSky: {
        path: '/gallery/earth_and_sky',
        label: 'Between earth and sky',
        id: '5',
        category: 'Side works',
      },
      infrared: {
        path: '/gallery/infrared',
        label: 'The world in infrared',
        id: '6',
        category: 'Side works',
      },
      blackAndWhite: {
        path: '/gallery/black_and_white',
        label: 'Work in black and white',
        id: '7',
        category: 'Side works',
      },
    },
  },
  about: {
    path: '/about',
    label: 'About',
  },
  contact: {
    path: '/contact',
    label: 'Contact',
  },
};

// Group gallery routes by category
export const galleryRoutesByCategory = Object.values(routes.gallery.children).reduce(
  (acc: Record<string, (typeof routes.gallery.children)[keyof typeof routes.gallery.children][]>, route) => {
    if (!acc[route.category]) {
      acc[route.category] = [];
    }
    acc[route.category].push(route);
    return acc;
  },
  {}
);
