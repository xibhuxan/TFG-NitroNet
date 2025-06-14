import { IsString, IsOptional, IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUsuarioDto {
  @ApiProperty({ description: 'Nombre de usuario único para login' })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({ description: 'Contraseña segura del usuario' })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiPropertyOptional({ description: 'Primer nombre del usuario' })
  @IsString()
  @IsOptional()
  nombre_uno?: string;

  @ApiPropertyOptional({ description: 'Segundo nombre del usuario' })
  @IsString()
  @IsOptional()
  nombre_dos?: string;

  @ApiPropertyOptional({ description: 'Primer apellido del usuario' })
  @IsString()
  @IsOptional()
  apellido_uno?: string;

  @ApiPropertyOptional({ description: 'Segundo apellido del usuario' })
  @IsString()
  @IsOptional()
  apellido_dos?: string;

  @ApiPropertyOptional({ description: 'ID del coche asociado al usuario' })
  @IsOptional()
  @IsNumber()
  id_coche?: number;
}
