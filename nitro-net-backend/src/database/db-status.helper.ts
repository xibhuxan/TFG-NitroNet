import { Injectable, Inject } from '@nestjs/common';
import { Pool } from 'mariadb';
import { MariaDbHelperService } from './mariadb-helper.dervice';

@Injectable()
export class DbStatusService {
    constructor(
        @Inject('NITRONET_DB') private readonly nitronetDb: Pool,
        //@Inject('OTRA_DB') private readonly otraDb: Pool,
        private readonly dbHelper: MariaDbHelperService,
    ) { }

    async getStatus(): Promise<{ nitronet: boolean }> {
        const nitronet = await this.dbHelper.ping(this.nitronetDb);
        return { nitronet };
    }

    /*
    async getStatus(): Promise<{ nitronet: boolean; otra: boolean }> {
        const [nitronet, otra] = await Promise.all([
        this.dbHelper.ping(this.nitronetDb),
        this.dbHelper.ping(this.otraDb),
        ]);
        return { nitronet, otra };
    }
    */

}
