/**
 * Environment configuration for development
 * Uses mock data by default, can connect to Spring Boot backend
 */
export const environment = {
  production: false,
  
  // API Configuration
  // Set useBackend to true to connect to Spring Boot backend
  useBackend: true,
  
  // Backend API URL (Spring Boot server)
  apiUrl: 'http://localhost:8080/api',
  
  // Mock API delay (ms) - only used when useBackend is false
  mockDelay: 500,
  
  // TMDB Configuration (for reference)
  tmdb: {
    apiUrl: 'https://api.themoviedb.org/3',
    imageBaseUrl: 'https://image.tmdb.org/t/p/w500'
  }
};
