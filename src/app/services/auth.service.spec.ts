import { TestBed } from '@angular/core/testing';
import { AuthService, AuthUser } from './auth.service';

/**
 * Tests for AuthService
 * PHASE 7: Service unit testing
 */
describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthService);
    // Clear localStorage before each test
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('register', () => {
    it('should register a new user successfully', () => {
      const result = service.register('testuser', 'test@example.com', 'password123');
      
      expect(result.success).toBeTruthy();
      expect(result.message).toBe('User registered successfully');
    });

    it('should fail when username already exists', () => {
      service.register('testuser', 'test1@example.com', 'password123');
      const result = service.register('testuser', 'test2@example.com', 'password456');
      
      expect(result.success).toBeFalsy();
      expect(result.message).toBe('Username already exists');
    });

    it('should fail when email already exists', () => {
      service.register('user1', 'test@example.com', 'password123');
      const result = service.register('user2', 'test@example.com', 'password456');
      
      expect(result.success).toBeFalsy();
      expect(result.message).toBe('Email is already registered');
    });
  });

  describe('login', () => {
    beforeEach(() => {
      service.register('testuser', 'test@example.com', 'password123');
    });

    it('should login with valid username', () => {
      const result = service.login('testuser', 'password123');
      
      expect(result.success).toBeTruthy();
      expect(result.message).toContain('Welcome');
    });

    it('should login with valid email', () => {
      const result = service.login('test@example.com', 'password123');
      
      expect(result.success).toBeTruthy();
    });

    it('should fail with invalid password', () => {
      const result = service.login('testuser', 'wrongpassword');
      
      expect(result.success).toBeFalsy();
      expect(result.message).toBe('Incorrect username or password');
    });

    it('should fail with non-existent user', () => {
      const result = service.login('nonexistent', 'password123');
      
      expect(result.success).toBeFalsy();
    });

    it('should update isAuthenticated signal after login', () => {
      expect(service.isAuthenticated()).toBeFalsy();
      
      service.login('testuser', 'password123');
      
      expect(service.isAuthenticated()).toBeTruthy();
    });
  });

  describe('logout', () => {
    beforeEach(() => {
      service.register('testuser', 'test@example.com', 'password123');
      service.login('testuser', 'password123');
    });

    it('should logout successfully', () => {
      service.logout();
      
      expect(service.isAuthenticated()).toBeFalsy();
    });
  });

  describe('getCurrentUser', () => {
    it('should return null when not logged in', () => {
      const user = service.getCurrentUser();
      
      expect(user).toBeNull();
    });

    it('should return user when logged in', () => {
      service.register('testuser', 'test@example.com', 'password123');
      service.login('testuser', 'password123');
      
      const user = service.getCurrentUser();
      
      expect(user).toBeTruthy();
      expect(user?.username).toBe('testuser');
    });
  });
});
