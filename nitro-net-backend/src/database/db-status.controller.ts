import { Controller, Get } from '@nestjs/common';
import { DbStatusService } from './db-status.helper';

@Controller('db-status')
export class DbStatusController {

    constructor(
        private readonly dbStatusService: DbStatusService
    ) { }

    @Get()
    async checkStatus() {
        return await this.dbStatusService.getStatus();
    }
}
