import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateCocheDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsOptional()
  modelo?: string;

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsOptional()
  cc?: number;

  @IsOptional()
  id_escala?: number | null;  // Puede ser null si no hay escala
}