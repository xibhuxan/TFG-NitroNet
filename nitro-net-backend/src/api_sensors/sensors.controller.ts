import { Controller } from '@nestjs/common';
import { SensorsService } from './sensors.service';

@Controller('sensors')
export class SensorsController {
  constructor(private readonly sensorsService: SensorsService) {}
}
