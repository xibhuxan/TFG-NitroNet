import { ApiProperty } from '@nestjs/swagger';

export class UsuarioDto {
  @ApiProperty({ description: 'ID único del usuario' })
  id: number;

  @ApiProperty({ description: 'Nombre de usuario único para login' })
  username: string;
}

export class RolDto {
  @ApiProperty({ description: 'ID único del rol' })
  id: number;

  @ApiProperty({ description: 'Tipo o nombre del rol' })
  tipo: string;
}

export class ResponseUsuarioRolDto {
  @ApiProperty({ description: 'ID único de la relación usuario-rol' })
  id: number;

  @ApiProperty({ type: UsuarioDto, description: 'Datos del usuario asignado' })
  usuario: UsuarioDto;

  @ApiProperty({ type: RolDto, description: 'Datos del rol asignado' })
  rol: RolDto;

  @ApiProperty({ description: 'Fecha de creación del registro' })
  created_at: Date;

  @ApiProperty({ description: 'Fecha de última actualización del registro' })
  updated_at: Date;
}
