import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ResponseUsuarioDto {
  @ApiProperty({ description: 'Identificador único del usuario' })
  id: number;

  @ApiProperty({ description: 'Nombre de usuario para login' })
  username: string;

  @ApiPropertyOptional({ description: 'Primer nombre del usuario' })
  nombre_uno?: string;

  @ApiPropertyOptional({ description: 'Segundo nombre del usuario' })
  nombre_dos?: string;

  @ApiPropertyOptional({ description: 'Primer apellido del usuario' })
  apellido_uno?: string;

  @ApiPropertyOptional({ description: 'Segundo apellido del usuario' })
  apellido_dos?: string;

  @ApiPropertyOptional({ description: 'Identificador del coche asociado, si hay' })
  id_coche?: number;

  @ApiProperty({ description: 'Fecha de creación del registro' })
  created_at: Date;

  @ApiProperty({ description: 'Fecha de la última actualización del registro' })
  updated_at: Date;
}
