import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateEscalaDto {
  @ApiProperty({ example: '1/10', description: 'Valor de la escala' })
  @IsString()
  @IsNotEmpty()
  valor: string;

  @ApiProperty({ example: 'Escala para coches grandes', required: false })
  @IsString()
  @IsOptional()
  descripcion?: string;
}
