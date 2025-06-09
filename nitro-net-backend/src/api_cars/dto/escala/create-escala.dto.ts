import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateEscalaDto {
  @IsString()
  @IsNotEmpty()
  valor: string;

  @IsString()
  @IsOptional()
  descripcion?: string;
}