import { IsInt, IsNumber } from 'class-validator';

export class CreateLecturaDto {
  @IsInt()
  id_sensor_coche: number;

  @IsNumber()
  valor: number;
}