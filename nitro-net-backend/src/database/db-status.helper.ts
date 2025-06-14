import { Injectable, Inject } from '@nestjs/common';
import { Pool } from 'mariadb';
import { MariaDbHelperService } from './mariadb-helper.service';

@Injectable()
export class DbStatusService {
    constructor(
        @Inject('NITRONET_DB') private readonly nitronetDb: Pool,
        private readonly dbHelper: MariaDbHelperService,
    ) { }

    async getStatus(): Promise<{ nitronet: boolean }> {
        const nitronet = await this.dbHelper.ping(this.nitronetDb);
        return { nitronet };
    }

}
