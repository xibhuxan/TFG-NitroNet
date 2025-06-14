import { IsInt, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateSensorCocheDto {
  @ApiProperty({ description: 'ID único del coche al que se asigna el sensor', example: 123 })
  @IsInt()
  id_coche: number;

  @ApiProperty({ description: 'ID único del sensor a asignar', example: 45 })
  @IsInt()
  id_sensor: number;

  @ApiPropertyOptional({ description: 'Ubicación física del sensor en el coche', example: 'Motor', })
  @IsString()
  @IsOptional()
  ubicacion?: string;
}
