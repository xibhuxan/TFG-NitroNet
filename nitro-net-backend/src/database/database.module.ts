import { Module } from '@nestjs/common';
import { DatabaseProviders } from './database.providers';
import { DbStatusController } from './db-status.controller';
import { MariaDbHelperService } from './mariadb-helper.dervice';
import { DbStatusService } from './db-status.helper';

@Module({
  providers: [...DatabaseProviders, MariaDbHelperService, DbStatusService],
  controllers: [DbStatusController],
  exports: [...DatabaseProviders, MariaDbHelperService, DbStatusService],
})
export class DatabaseModule {}
