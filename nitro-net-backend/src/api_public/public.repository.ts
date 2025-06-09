import { Inject, Injectable } from "@nestjs/common";
import { InjectDataSource } from "@nestjs/typeorm";
import { Pool } from "mariadb";
import { MariaDbHelperService } from "src/database/mariadb-helper.service";
import { DataSource } from "typeorm";

@Injectable()
export class PublicRepository {
    constructor(
        @Inject('NITRONET_DB') private readonly nitronetDb: Pool,
        private readonly dbHelper: MariaDbHelperService,
    ){}
    
    async getAllViews(){
        
    }
}