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
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
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

@ApiTags('Auth') // Agrupa las rutas en Swagger
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login-web')
  @ApiOperation({ summary: 'Login desde interfaz web (con cookie)' })
  @ApiBody({ type: LoginDto })
  @ApiResponse({ status: 200, description: 'Login correcto' })
  async login(@Body() dto: LoginDto, @Res({ passthrough: true }) res: Response) {
    const user = await this.authService.validarUsuario(dto);
    const token = await this.authService.login(user);
    res.cookie('access_token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      maxAge: 1000 * 60 * 30,
    });
    return { message: 'Login correcto' };
  }

  @Post('login-api')
  @ApiOperation({ summary: 'Login desde API (devuelve token)' })
  @ApiBody({ type: LoginDto })
  @ApiResponse({ status: 200, description: 'Token generado' })
  async loginApi(@Body() dto: LoginDto) {
    const user = await this.authService.validarUsuario(dto);
    return this.authService.login(user);
  }

  @Post('logout')
  @ApiOperation({ summary: 'Cerrar sesión (borra cookie)' })
  @ApiResponse({ status: 200, description: 'Logout exitoso' })
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('access_token');
    return { message: 'Logout exitoso' };
  }

  // Usuarios
  @Post('usuarios')
  @ApiOperation({ summary: 'Crear nuevo usuario' })
  @ApiBody({ type: CreateUsuarioDto })
  @ApiResponse({ status: 201, description: 'Usuario creado exitosamente', type: ResponseUsuarioDto })
  createUser(@Body() createUserDto: CreateUsuarioDto) {
    return this.authService.createUser(createUserDto);
  }

  @Get('usuarios')
  @ApiOperation({ summary: 'Obtener todos los usuarios' })
  @ApiResponse({ status: 200, description: 'Lista de usuarios', type: [ResponseUsuarioDto] })
  getAllUsers(): Promise<ResponseUsuarioDto[] | null> {
    return this.authService.getAllUsers();
  }

  @Get('usuarios/:id')
  @ApiOperation({ summary: 'Obtener usuario por ID' })
  @ApiParam({ name: 'id', description: 'ID del usuario', type: Number })
  @ApiResponse({ status: 200, description: 'Usuario encontrado', type: ResponseUsuarioDto })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
  getUser(@Param('id', ParseIntPipe) id: number): Promise<ResponseUsuarioDto | null> {
    return this.authService.getUserById(id);
  }

  @Patch('usuarios/:id')
  @ApiOperation({ summary: 'Actualizar usuario' })
  @ApiParam({ name: 'id', description: 'ID del usuario a actualizar', type: Number })
  @ApiBody({ type: UpdateUsuarioDto })
  @ApiResponse({ status: 200, description: 'Usuario actualizado', type: ResponseUsuarioDto })
  updateUser(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUsuarioDto) {
    return this.authService.updateUser(id, updateUserDto);
  }

  @Delete('usuarios/:id')
  @ApiOperation({ summary: 'Eliminar usuario por ID' })
  @ApiParam({ name: 'id', description: 'ID del usuario a eliminar', type: Number })
  @ApiResponse({ status: 200, description: 'Usuario eliminado exitosamente' })
  deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.authService.deleteUser(id);
  }

  // Roles
  @Post('roles')
  @ApiOperation({ summary: 'Crear nuevo rol' })
  @ApiBody({ type: CreateRolDto })
  @ApiResponse({ status: 201, description: 'Rol creado exitosamente', type: ResponseRolDto })
  createRole(@Body() createRoleDto: CreateRolDto) {
    return this.authService.createRole(createRoleDto);
  }

  @Get('roles')
  @ApiOperation({ summary: 'Obtener todos los roles' })
  @ApiResponse({ status: 200, description: 'Lista de roles', type: [ResponseRolDto] })
  getAllRoles(): Promise<ResponseRolDto[] | null> {
    return this.authService.getAllRoles();
  }

  @Get('roles/:id')
  @ApiOperation({ summary: 'Obtener rol por ID' })
  @ApiParam({ name: 'id', description: 'ID del rol', type: Number })
  @ApiResponse({ status: 200, description: 'Rol encontrado', type: ResponseRolDto })
  @ApiResponse({ status: 404, description: 'Rol no encontrado' })
  getRole(@Param('id', ParseIntPipe) id: number): Promise<ResponseRolDto> {
    return this.authService.getRoleById(id);
  }

  @Patch('roles/:id')
  @ApiOperation({ summary: 'Actualizar rol' })
  @ApiParam({ name: 'id', description: 'ID del rol a actualizar', type: Number })
  @ApiBody({ type: UpdateRolDto })
  @ApiResponse({ status: 200, description: 'Rol actualizado', type: ResponseRolDto })
  updateRole(@Param('id', ParseIntPipe) id: number, @Body() updateRoleDto: UpdateRolDto) {
    return this.authService.updateRole(id, updateRoleDto);
  }

  @Delete('roles/:id')
  @ApiOperation({ summary: 'Eliminar rol por ID' })
  @ApiParam({ name: 'id', description: 'ID del rol a eliminar', type: Number })
  @ApiResponse({ status: 200, description: 'Rol eliminado exitosamente' })
  deleteRole(@Param('id', ParseIntPipe) id: number) {
    return this.authService.deleteRole(id);
  }

  // Usuarios-Roles
  @Post('usuarios/:usuariosId/roles/:rolesId')
  @ApiOperation({ summary: 'Asignar rol a usuario' })
  @ApiParam({ name: 'usuariosId', description: 'ID del usuario', type: Number })
  @ApiParam({ name: 'rolesId', description: 'ID del rol', type: Number })
  assignRoleToUser(
    @Param('usuariosId', ParseIntPipe) usuariosId: number,
    @Param('rolesId', ParseIntPipe) rolesId: number
  ) {
    return this.authService.assignRoleToUser(usuariosId, rolesId);
  }

  @Get('usuarios/:usuariosId/roles')
  @ApiOperation({ summary: 'Obtener roles de un usuario' })
  @ApiParam({ name: 'usuariosId', description: 'ID del usuario', type: Number })
  @ApiResponse({ status: 200, description: 'Roles encontrados', type: [ResponseUsuarioRolDto] })
  getUserRoles(@Param('usuariosId', ParseIntPipe) usuariosId: number): Promise<ResponseUsuarioRolDto[] | null> {
    return this.authService.getUserRoles(usuariosId);
  }

  @Delete('usuarios/:usuariosId/roles/:rolesId')
  @ApiOperation({ summary: 'Eliminar rol de usuario' })
  @ApiParam({ name: 'usuariosId', description: 'ID del usuario', type: Number })
  @ApiParam({ name: 'rolesId', description: 'ID del rol', type: Number })
  removeRoleFromUser(
    @Param('usuariosId', ParseIntPipe) usuariosId: number,
    @Param('rolesId', ParseIntPipe) rolesId: number
  ) {
    return this.authService.removeRoleFromUser(usuariosId, rolesId);
  }
}
