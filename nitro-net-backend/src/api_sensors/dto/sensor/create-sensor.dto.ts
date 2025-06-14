import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSensorDto {
  @ApiProperty({ description: 'Nombre descriptivo del sensor', example: 'Sensor de Temperatura' })
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @ApiProperty({ description: 'Unidad de medida del sensor', example: '°C' })
  @IsString()
  @IsNotEmpty()
  unidad: string;

  @ApiProperty({ description: 'Tipo o categoría del sensor', example: 'Temperatura' })
  @IsString()
  @IsNotEmpty()
  tipo: string;
}
