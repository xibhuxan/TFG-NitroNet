import { IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUsuarioRolDto {
  @ApiProperty({ description: 'ID único del usuario al que se le asignará el rol' })
  @IsInt()
  id_usuario: number;

  @ApiProperty({ description: 'ID único del rol que se asignará al usuario' })
  @IsInt()
  id_rol: number;
}
