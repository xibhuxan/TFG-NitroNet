import { Inject, Injectable } from "@nestjs/common";
import { Pool } from "mariadb";

@Injectable()
export class AppRepository {
    constructor(
        @Inject('NITRONET_DB') private readonly nitronet_db: Pool,
    ) { }

    async checkDbStatus(): Promise<boolean> {
        try {
            const conn = await this.nitronet_db.getConnection();
            try {
                await conn.query('SELECT 1');
                return true;
            } finally {
                conn.release();
            }
        } catch (error) {
            console.error('Database connection failed:', error.message);
            return false;
        }
    }

}