import { ApiProperty } from '@nestjs/swagger';

export class ResponseEscalaDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  valor: string;

  @ApiProperty({ required: false })
  descripcion?: string;

  @ApiProperty()
  created_at: Date;

  @ApiProperty()
  updated_at: Date;
}
