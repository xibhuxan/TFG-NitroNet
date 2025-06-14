import { ApiProperty } from '@nestjs/swagger';

export class ResponseSensorDto {
  @ApiProperty({ description: 'Identificador único del sensor', example: 1 })
  id: number;

  @ApiProperty({ description: 'Nombre descriptivo del sensor', example: 'Sensor de Temperatura' })
  nombre: string;

  @ApiProperty({ description: 'Unidad de medida del sensor', example: '°C' })
  unidad: string;

  @ApiProperty({ description: 'Tipo o categoría del sensor', example: 'Temperatura' })
  tipo: string;

  @ApiProperty({ description: 'Fecha de creación del registro', example: '2024-04-26T12:34:56Z' })
  created_at: Date;

  @ApiProperty({ description: 'Fecha de la última actualización del registro', example: '2024-04-27T09:10:11Z' })
  updated_at: Date;
}
