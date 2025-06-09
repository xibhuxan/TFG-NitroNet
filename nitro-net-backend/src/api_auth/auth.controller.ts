import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  ParseIntPipe,
  Patch,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUsuarioDto } from './dto/usuario/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/usuario/update-usuario.dto';
import { CreateRolDto } from './dto/roles/create-rol.dto';
import { UpdateRolDto } from './dto/roles/update-rol.dto';
import { ResponseUsuarioDto } from './dto/usuario/response-usuario.dto';
import { ResponseRolDto } from './dto/roles/response-rol.dto';
import { ResponseUsuarioRolDto } from './dto/usuario-rol/response-usuario-rol.dto';
import { LoginDto } from './dto/login/login.dto';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ) { }

  @Post('login-web')
  async login(@Body() dto: LoginDto, @Res({ passthrough: true }) res: Response) {
    const user = await this.authService.validarUsuario(dto);
    const token = await this.authService.login(user);

    // Guardar en cookie segura
    res.cookie('access_token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      maxAge: 1000 * 60 * 30, // 30 minutos
    });

    return { message: 'Login correcto ' };
  }

  @Post('login-api')
  async loginApi(@Body() dto: LoginDto) {
    const user = await this.authService.validarUsuario(dto);
    return this.authService.login(user); // devuelve access_token
  }


  @Post('logout')
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('access_token');
    return { message: 'Logout exitoso' };
  }


  // ----- Usuarios -----
  @Post('usuarios')
  createUser(@Body() createUserDto: CreateUsuarioDto) {
    return this.authService.createUser(createUserDto);
  }

  @Get('usuarios')
  getAllUsers(): Promise<ResponseUsuarioDto[] | null> {
    return this.authService.getAllUsers();
  }

  @Get('usuarios/:id')
  getUser(@Param('id', ParseIntPipe) id: number): Promise<ResponseUsuarioDto | null> {
    return this.authService.getUserById(id);
  }

  @Patch('usuarios/:id')
  updateUser(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUsuarioDto) {
    return this.authService.updateUser(id, updateUserDto);
  }

  @Delete('usuarios/:id')
  deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.authService.deleteUser(id);
  }

  // ----- Roles -----
  @Post('roles')
  createRole(@Body() createRoleDto: CreateRolDto) {
    return this.authService.createRole(createRoleDto);
  }

  @Get('roles')
  getAllRoles(): Promise<ResponseRolDto[] | null> {
    return this.authService.getAllRoles();
  }

  @Get('roles/:id')
  getRole(@Param('id', ParseIntPipe) id: number): Promise<ResponseRolDto> {
    return this.authService.getRoleById(id);
  }

  @Patch('roles/:id')
  updateRole(@Param('id', ParseIntPipe) id: number, @Body() updateRoleDto: UpdateRolDto) {
    return this.authService.updateRole(id, updateRoleDto);
  }

  @Delete('roles/:id')
  deleteRole(@Param('id', ParseIntPipe) id: number) {
    return this.authService.deleteRole(id);
  }

  // ----- usuarios_roles ------
  @Post('usuarios/:usuariosId/roles/:rolesId')
  assignRoleToUser(
    @Param('usuariosId', ParseIntPipe) usuariosId: number,
    @Param('rolesId', ParseIntPipe) rolesId: number
  ) {
    return this.authService.assignRoleToUser(usuariosId, rolesId);
  }

  @Get('usuarios/:usuariosId/roles')
  getUserRoles(@Param('usuariosId', ParseIntPipe) usuariosId: number): Promise<ResponseUsuarioRolDto[] | null> {
    return this.authService.getUserRoles(usuariosId);
  }

  @Delete('usuarios/:usuariosId/roles/:rolesId')
  removeRoleFromUser(
    @Param('usuariosId', ParseIntPipe) usuariosId: number,
    @Param('rolesId', ParseIntPipe) rolesId: number
  ) {
    return this.authService.removeRoleFromUser(usuariosId, rolesId);
  }
}
