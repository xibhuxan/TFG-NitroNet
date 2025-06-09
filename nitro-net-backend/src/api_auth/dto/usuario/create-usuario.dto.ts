import { IsString, IsOptional, IsNotEmpty } from 'class-validator';

export class CreateUsuarioDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsOptional()
  nombre_uno?: string;

  @IsString()
  @IsOptional()
  nombre_dos?: string;

  @IsString()
  @IsOptional()
  apellido_uno?: string;

  @IsString()
  @IsOptional()
  apellido_dos?: string;

  @IsOptional()
  id_coche?: number;
}
