import { IsInt } from 'class-validator';

export class CreateUsuarioRolDto {
  @IsInt()
  id_usuario: number;

  @IsInt()
  id_rol: number;
}
