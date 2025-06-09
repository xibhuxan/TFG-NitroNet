import { IsString, IsNotEmpty } from 'class-validator';

export class CreateSensorDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsNotEmpty()
  unidad: string;

  @IsString()
  @IsNotEmpty()
  tipo: string;
}