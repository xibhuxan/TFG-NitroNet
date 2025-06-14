import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateCocheDto {
  @ApiProperty({ example: 'Nitro Racer X' })
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @ApiPropertyOptional({ example: 'XR-12' })
  @IsString()
  @IsOptional()
  modelo?: string;

  @ApiPropertyOptional({ example: 3.5, description: 'Cilindrada en cc' })
  @IsNumber({ maxDecimalPlaces: 2 })
  @IsOptional()
  cc?: number;

  @ApiPropertyOptional({ example: 1, description: 'ID de la escala asociada' })
  @IsOptional()
  id_escala?: number | null;
}
