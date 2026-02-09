/**
 * Environment configuration for production
 */
export const environment = {
  production: true,
  
  // API Configuration
  // In production, connect to backend API
  useBackend: true,
  
  // Backend API URL - update this with your production API URL
  apiUrl: '/api',
  
  // Mock API delay (ms) - not used in production
  mockDelay: 0,
  
  // TMDB Configuration
  tmdb: {
    apiUrl: 'https://api.themoviedb.org/3',
    imageBaseUrl: 'https://image.tmdb.org/t/p/w500'
  }
};
