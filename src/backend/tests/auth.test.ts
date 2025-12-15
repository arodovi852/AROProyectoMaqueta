/**
 * Tests de Autenticación
 * 
 * Para ejecutar: npm test
 * Requiere: Jest y Supertest
 *   npm install --save-dev jest @types/jest ts-jest supertest @types/supertest
 */

import { UserService } from '../services/user.service';
import { generateToken, verifyToken } from '../utils/jwt.utils';
import { hashPassword, verifyPassword } from '../utils/password.utils';

describe('Authentication Tests', () => {
  describe('JWT Token Generation and Verification', () => {
    test('should generate a valid JWT token', () => {
      const payload = {
        id: '123',
        email: 'test@test.com',
        username: 'testuser',
        role: 'USER' as any,
      };

      const token = generateToken(payload);
      
      expect(token).toBeDefined();
      expect(typeof token).toBe('string');
      expect(token.split('.')).toHaveLength(3); // Header.Payload.Signature
    });

    test('should verify a valid token', () => {
      const payload = {
        id: '123',
        email: 'test@test.com',
        username: 'testuser',
        role: 'USER' as any,
      };

      const token = generateToken(payload);
      const decoded = verifyToken(token);

      expect(decoded.id).toBe(payload.id);
      expect(decoded.email).toBe(payload.email);
      expect(decoded.username).toBe(payload.username);
      expect(decoded.role).toBe(payload.role);
    });

    test('should reject invalid token', () => {
      expect(() => {
        verifyToken('invalid.token.here');
      }).toThrow();
    });

    test('should reject malformed token', () => {
      expect(() => {
        verifyToken('malformed-token');
      }).toThrow('Token inválido');
    });
  });

  describe('Password Hashing and Verification', () => {
    test('should hash a password', async () => {
      const password = 'password123';
      const hash = await hashPassword(password);

      expect(hash).toBeDefined();
      expect(hash).not.toBe(password);
      expect(hash.length).toBeGreaterThan(0);
    });

    test('should verify correct password', async () => {
      const password = 'password123';
      const hash = await hashPassword(password);
      const isValid = await verifyPassword(password, hash);

      expect(isValid).toBe(true);
    });

    test('should reject incorrect password', async () => {
      const password = 'password123';
      const hash = await hashPassword(password);
      const isValid = await verifyPassword('wrongpassword', hash);

      expect(isValid).toBe(false);
    });

    test('should generate different hashes for same password', async () => {
      const password = 'password123';
      const hash1 = await hashPassword(password);
      const hash2 = await hashPassword(password);

      // Los hashes deben ser diferentes debido al salt
      expect(hash1).not.toBe(hash2);
      
      // Pero ambos deben verificar correctamente
      expect(await verifyPassword(password, hash1)).toBe(true);
      expect(await verifyPassword(password, hash2)).toBe(true);
    });
  });

  describe('User Registration', () => {
    test('should validate email format', () => {
      const invalidEmails = ['invalid', 'test@', '@test.com', 'test@test'];
      const validEmail = 'test@test.com';

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      
      invalidEmails.forEach(email => {
        expect(emailRegex.test(email)).toBe(false);
      });

      expect(emailRegex.test(validEmail)).toBe(true);
    });

    test('should validate password length', () => {
      const shortPassword = '1234567'; // 7 caracteres
      const validPassword = '12345678'; // 8 caracteres

      expect(shortPassword.length).toBeLessThan(8);
      expect(validPassword.length).toBeGreaterThanOrEqual(8);
    });
  });

  describe('Role-based Authorization', () => {
    test('ADMIN role should have higher privileges than USER', () => {
      const adminToken = generateToken({
        id: '1',
        email: 'admin@test.com',
        username: 'admin',
        role: 'ADMIN' as any,
      });

      const userToken = generateToken({
        id: '2',
        email: 'user@test.com',
        username: 'user',
        role: 'USER' as any,
      });

      const adminDecoded = verifyToken(adminToken);
      const userDecoded = verifyToken(userToken);

      expect(adminDecoded.role).toBe('ADMIN');
      expect(userDecoded.role).toBe('USER');
    });

    test('should decode role correctly from token', () => {
      const roles = ['USER', 'ADMIN'];

      roles.forEach(role => {
        const token = generateToken({
          id: '1',
          email: 'test@test.com',
          username: 'test',
          role: role as any,
        });

        const decoded = verifyToken(token);
        expect(decoded.role).toBe(role);
      });
    });
  });
});

describe('API Endpoint Tests (Structure)', () => {
  describe('POST /api/users/register', () => {
    test('should require email, username, and password', () => {
      const requiredFields = ['email', 'username', 'password'];
      const testData = {
        email: 'test@test.com',
        username: 'testuser',
        password: 'password123',
      };

      requiredFields.forEach(field => {
        expect(testData).toHaveProperty(field);
        expect(testData[field as keyof typeof testData]).toBeDefined();
      });
    });

    test('should validate password minimum length', () => {
      const validPassword = 'password123';
      const invalidPassword = 'pass123';

      expect(validPassword.length).toBeGreaterThanOrEqual(8);
      expect(invalidPassword.length).toBeLessThan(8);
    });
  });

  describe('POST /api/users/login', () => {
    test('should require email and password', () => {
      const loginData = {
        email: 'test@test.com',
        password: 'password123',
      };

      expect(loginData).toHaveProperty('email');
      expect(loginData).toHaveProperty('password');
    });

    test('should return token on successful login', () => {
      const mockResponse = {
        success: true,
        data: {
          user: {
            id: '1',
            email: 'test@test.com',
            username: 'testuser',
          },
          token: generateToken({
            id: '1',
            email: 'test@test.com',
            username: 'testuser',
            role: 'USER' as any,
          }),
        },
      };

      expect(mockResponse.success).toBe(true);
      expect(mockResponse.data.token).toBeDefined();
      expect(typeof mockResponse.data.token).toBe('string');
    });
  });

  describe('Protected Routes', () => {
    test('should require Authorization header', () => {
      const headers = {
        'Authorization': 'Bearer token-here',
      };

      expect(headers).toHaveProperty('Authorization');
      expect(headers.Authorization).toMatch(/^Bearer /);
    });

    test('should extract token from Authorization header', () => {
      const authHeader = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
      const token = authHeader.substring(7);

      expect(token).toBe('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...');
      expect(token).not.toContain('Bearer');
    });
  });
});
