import { PartialType } from '@nestjs/mapped-types';
import { CreateSensorCocheDto } from './create-sensor-coche.dto';

export class UpdateSensorCocheDto extends PartialType(CreateSensorCocheDto) {}
