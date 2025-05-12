import { Injectable } from '@nestjs/common';
import { SensorsRepository } from './sensors.repository';

@Injectable()
export class SensorsService {
    
    constructor(
        private readonly sensorsRepository: SensorsRepository,
    ) { }

}
