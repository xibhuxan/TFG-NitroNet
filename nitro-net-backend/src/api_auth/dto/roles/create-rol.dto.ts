import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRolDto {
  @ApiProperty({ description: 'Tipo o nombre del rol a crear', example: 'admin' })
  @IsString()
  @IsNotEmpty()
  tipo: string;
}
