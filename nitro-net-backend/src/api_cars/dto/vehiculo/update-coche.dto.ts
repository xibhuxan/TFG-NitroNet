import { PartialType } from '@nestjs/mapped-types';
import { CreateCocheDto } from './create-coche.dto';

export class UpdateCocheDto extends PartialType(CreateCocheDto) {}
