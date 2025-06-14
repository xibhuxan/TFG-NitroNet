import { IsInt, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUserAgentLogDto {
  @ApiProperty({ description: 'ID del login al que se asocia el user-agent' })
  @IsInt()
  id_login: number;

  @ApiPropertyOptional({ description: 'Nombre del navegador' })
  @IsOptional()
  @IsString()
  browser_name?: string;

  @ApiPropertyOptional({ description: 'Versión completa del navegador' })
  @IsOptional()
  @IsString()
  browser_version?: string;

  @ApiPropertyOptional({ description: 'Versión principal del navegador' })
  @IsOptional()
  @IsString()
  browser_major?: string;

  @ApiPropertyOptional({ description: 'Nombre del motor de renderizado' })
  @IsOptional()
  @IsString()
  engine_name?: string;

  @ApiPropertyOptional({ description: 'Versión del motor de renderizado' })
  @IsOptional()
  @IsString()
  engine_version?: string;

  @ApiPropertyOptional({ description: 'Tipo de dispositivo (mobile, tablet, etc)' })
  @IsOptional()
  @IsString()
  device_type?: string;

  @ApiPropertyOptional({ description: 'Fabricante del dispositivo' })
  @IsOptional()
  @IsString()
  device_vendor?: string;

  @ApiPropertyOptional({ description: 'Modelo del dispositivo' })
  @IsOptional()
  @IsString()
  device_model?: string;

  @ApiPropertyOptional({ description: 'Nombre del sistema operativo' })
  @IsOptional()
  @IsString()
  os_name?: string;

  @ApiPropertyOptional({ description: 'Versión del sistema operativo' })
  @IsOptional()
  @IsString()
  os_version?: string;

  @ApiPropertyOptional({ description: 'Texto completo del user-agent' })
  @IsOptional()
  @IsString()
  user_agent_text?: string;
}
