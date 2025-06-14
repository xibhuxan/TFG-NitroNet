import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ResponseSensorCocheDto {
  @ApiProperty({ description: 'ID único del registro de sensor asignado al coche', example: 101 })
  id: number;

  @ApiProperty({ description: 'ID del coche al que está asignado el sensor', example: 123 })
  id_coche: number;

  @ApiProperty({ description: 'ID del sensor asignado', example: 45 })
  id_sensor: number;

  @ApiPropertyOptional({ description: 'Ubicación del sensor en el coche', example: 'Motor' })
  ubicacion?: string;

  @ApiProperty({ description: 'Fecha y hora de creación del registro', example: '2025-06-14T12:00:00Z' })
  created_at: Date;

  @ApiProperty({ description: 'Fecha y hora de la última actualización del registro', example: '2025-06-14T12:30:00Z' })
  updated_at: Date;
}
