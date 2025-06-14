import { ApiProperty } from '@nestjs/swagger';

export class ResponseLecturaDto {
  @ApiProperty({ description: 'Identificador único de la lectura', example: 101 })
  id: number;

  @ApiProperty({ description: 'ID del sensor asociado al coche', example: 42 })
  id_sensor_coche: number;

  @ApiProperty({ description: 'Valor numérico leído por el sensor', example: 98.6 })
  valor: number;

  @ApiProperty({ description: 'Fecha y hora de creación de la lectura', example: '2025-06-14T12:34:56Z' })
  created_at: Date;
}
