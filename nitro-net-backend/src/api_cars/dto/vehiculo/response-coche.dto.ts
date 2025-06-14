import { ApiProperty } from '@nestjs/swagger';

export class ResponseCocheDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  nombre: string;

  @ApiProperty({ required: false })
  modelo?: string;

  @ApiProperty({ required: false })
  cc?: number;

  @ApiProperty({ required: false })
  id_escala?: number | null;

  @ApiProperty()
  created_at: Date;

  @ApiProperty()
  updated_at: Date;
}
