import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { AuthRepository } from './auth.repository';
import { CreateUsuarioDto } from './dto/usuario/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/usuario/update-usuario.dto';
import { CreateRolDto } from './dto/roles/create-rol.dto';
import { UpdateRolDto } from './dto/roles/update-rol.dto';
import { ResponseUsuarioDto } from './dto/usuario/response-usuario.dto';
import { LoginDto } from './dto/login/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly authRepository: AuthRepository,
  ) { }

  async validarUsuario(dto: LoginDto): Promise<ResponseUsuarioDto> {
    const user = await this.authRepository.getUserByUsername(dto.username);

    if (!user) {
      throw new UnauthorizedException('Usuario no encontrado');
    }

    const passwordValid = await bcrypt.compare(dto.password, user.password_hash);

    if (!passwordValid) {
      throw new UnauthorizedException('Contraseña incorrecta');
    }
    
    delete user.password_hash
    return user;
  }

  async login(user: ResponseUsuarioDto) {
    const payload = {
      sub: user.id,
      username: user.username
    };

    const token = this.jwtService.sign(payload, {
      expiresIn: '30m',
    });

    return {
      access_token: token,
    };
  }

  // ---------- USUARIOS ----------
  async createUser(dto: CreateUsuarioDto) {
    const existingUser = await this.existsUsername(dto.username);
    if (existingUser) {
      throw new Error('El usuario ya existe');
    }
    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const userToSave = { ...dto, password: hashedPassword };
    return this.authRepository.createUser(userToSave);
  }

  async getAllUsers() {
    return this.authRepository.getAllUsers();
  }

  async existsUsername(username: string) {
    const user = await this.authRepository.getUserByUsername(username);
    return user != null;
  }

  async getUserById(id: number) {
    const user = await this.authRepository.getUserById(id);
    if (!user) throw new NotFoundException('Usuario no encontrado');
    return user;
  }

  async updateUser(id: number, dto: UpdateUsuarioDto) {
    let updateData: any = { ...dto };
    if (dto.password) {
      updateData.password_hash = await bcrypt.hash(dto.password, 10);
      delete updateData.password;
    }
    const updated = await this.authRepository.updateUser(id, updateData);
    if (!updated) throw new NotFoundException('Usuario no encontrado');
    return updated;
  }

  async deleteUser(id: number) {
    const result = await this.authRepository.deleteUser(id);
    if (!result) throw new NotFoundException('Usuario no encontrado');
    return { message: 'Usuario eliminado' };
  }

  // ---------- ROLES ----------
  createRole(dto: CreateRolDto) {
    return this.authRepository.createRole(dto);
  }

  getAllRoles() {
    return this.authRepository.getAllRoles();
  }

  async getRoleById(id: number) {
    const rol = await this.authRepository.getRolById(id);
    if (!rol) throw new NotFoundException('Rol no encontrado');
    return rol;
  }

  async updateRole(id: number, dto: UpdateRolDto) {
    const updated = await this.authRepository.updateRole(id, dto);
    if (!updated) throw new NotFoundException('Rol no encontrado');
    return updated;
  }

  async deleteRole(id: number) {
    const result = await this.authRepository.deleteRole(id);
    if (!result) throw new NotFoundException('Rol no encontrado');
    return { message: 'Rol eliminado' };
  }

  // ---------- ASIGNACIÓN DE ROLES A USUARIOS ----------
  async assignRoleToUser(userId: number, roleId: number) {
    const result = await this.authRepository.assignRoleToUser(userId, roleId);
    if (result === 'exists') {
      return { message: 'El usuario ya tiene este rol' };
    }
    return { message: 'Rol asignado al usuario' };
  }

  async getUserRoles(userId: number) {
    return this.authRepository.getUserRoles(userId);
  }

  async removeRoleFromUser(userId: number, roleId: number) {
    const result = await this.authRepository.removeRoleFromUser(userId, roleId);
    if (!result) {
      return { message: 'El usuario no tenía ese rol' };
    }
    return { message: 'Rol eliminado del usuario' };
  }
}
