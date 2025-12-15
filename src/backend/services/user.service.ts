import { User } from '../models/user.model';
import { UserRepository } from '../repositories/user.repository';
import { CreateUserDto, UpdateUserDto, UserResponseDto, UserProfileDto, LoginDto, AuthResponseDto } from '../dtos/user.dto';

/**
 * Servicio de Usuarios
 */
export class UserService {
  constructor(private userRepository: UserRepository) {}

  /**
   * Registra un nuevo usuario
   * REGLAS: email y username únicos
   */
  async register(dto: CreateUserDto): Promise<UserResponseDto> {
    // Verificar email único
    const existsByEmail = await this.userRepository.existsByEmail(dto.email);
    if (existsByEmail) {
      throw new Error('Este email ya está registrado');
    }

    // Verificar username único
    const existsByUsername = await this.userRepository.existsByUsername(dto.username);
    if (existsByUsername) {
      throw new Error('Este nombre de usuario ya está en uso');
    }

    // Validar longitud de username
    if (dto.username.length < 3) {
      throw new Error('El nombre de usuario debe tener al menos 3 caracteres');
    }

    // Validar contraseña (mínimo 8 caracteres)
    if (dto.password.length < 8) {
      throw new Error('La contraseña debe tener al menos 8 caracteres');
    }

    // TODO: Hashear contraseña con bcrypt
    const hashedPassword = dto.password; // Aquí iría: await bcrypt.hash(dto.password, 10);

    const user = new User({
      ...dto,
      password: hashedPassword,
    });

    const created = await this.userRepository.create(user);
    
    return this.mapToResponseDto(created);
  }

  /**
   * Login de usuario
   */
  async login(dto: LoginDto): Promise<AuthResponseDto> {
    const user = await this.userRepository.findByEmailWithPassword(dto.email);
    
    if (!user) {
      throw new Error('Credenciales inválidas');
    }

    // TODO: Verificar contraseña con bcrypt
    // const isValidPassword = await bcrypt.compare(dto.password, user.password);
    const isValidPassword = user.password === dto.password; // Temporal

    if (!isValidPassword) {
      throw new Error('Credenciales inválidas');
    }

    if (!user.isActive) {
      throw new Error('Tu cuenta está desactivada');
    }

    // TODO: Generar JWT token
    const token = 'jwt_token_here'; // Aquí iría la generación del token
    const expiresIn = 3600; // 1 hora

    return {
      user: this.mapToResponseDto(user),
      token,
      expiresIn,
    };
  }

  /**
   * Obtiene un usuario por ID
   */
  async findById(id: string): Promise<UserResponseDto | null> {
    const user = await this.userRepository.findById(id);
    return user ? this.mapToResponseDto(user) : null;
  }

  /**
   * Obtiene el perfil completo con estadísticas
   */
  async getProfile(id: string): Promise<UserProfileDto | null> {
    return await this.userRepository.getProfile(id);
  }

  /**
   * Actualiza un usuario
   */
  async update(id: string, dto: UpdateUserDto): Promise<UserResponseDto> {
    const updated = await this.userRepository.update(id, dto);
    if (!updated) {
      throw new Error('Usuario no encontrado');
    }

    return this.mapToResponseDto(updated);
  }

  /**
   * Elimina un usuario (soft delete)
   */
  async delete(id: string): Promise<boolean> {
    return await this.userRepository.delete(id);
  }

  /**
   * Verifica disponibilidad de username
   */
  async isUsernameAvailable(username: string): Promise<boolean> {
    return !(await this.userRepository.existsByUsername(username));
  }

  /**
   * Verifica disponibilidad de email
   */
  async isEmailAvailable(email: string): Promise<boolean> {
    return !(await this.userRepository.existsByEmail(email));
  }

  private mapToResponseDto(user: User): UserResponseDto {
    return {
      id: user.id,
      username: user.username,
      email: user.email,
      displayName: user.displayName,
      bio: user.bio,
      avatar: user.avatar,
      role: user.role,
      isActive: user.isActive,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}
