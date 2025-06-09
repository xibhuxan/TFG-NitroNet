import { IsInt, IsOptional, IsString } from 'class-validator';

export class CreateSensorCocheDto {
  @IsInt()
  id_coche: number;

  @IsInt()
  id_sensor: number;

  @IsString()
  @IsOptional()
  ubicacion?: string;
}