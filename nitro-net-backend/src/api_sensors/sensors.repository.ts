import { Inject, Injectable } from "@nestjs/common";
import { MariaDbHelperService } from "src/database/mariadb-helper.dervice";
import * as mariadb from 'mariadb';

@Injectable()
export class SensorsRepository {
    
    constructor(
        @Inject('NITRONET_DB') private readonly nitronet_db: mariadb.Pool,
        private readonly db_helper: MariaDbHelperService,
    ){}
    
}