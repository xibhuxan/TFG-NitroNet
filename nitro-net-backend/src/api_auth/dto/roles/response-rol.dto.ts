import { ApiProperty } from '@nestjs/swagger';

export class ResponseRolDto {
  @ApiProperty({ description: 'Identificador único del rol', example: 1 })
  id: number;

  @ApiProperty({ description: 'Tipo o nombre del rol', example: 'admin' })
  tipo: string;
}
