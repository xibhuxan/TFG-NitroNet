import { Module } from '@nestjs/common';
import { SensorsService } from './sensors.service';
import { SensorsController } from './sensors.controller';
import { SensorsRepository } from './sensors.repository';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [SensorsController],
  providers: [SensorsService, SensorsRepository],
})
export class SensorsModule {}
