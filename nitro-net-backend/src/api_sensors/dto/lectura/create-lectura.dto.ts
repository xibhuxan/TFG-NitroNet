import { IsInt, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateLecturaDto {
  @ApiProperty({ description: 'ID del sensor asociado al coche', example: 42 })
  @IsInt()
  id_sensor_coche: number;

  @ApiProperty({ description: 'Valor numérico leído por el sensor', example: 98.6 })
  @IsNumber()
  valor: number;
}
