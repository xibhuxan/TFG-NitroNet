import { Injectable } from '@nestjs/common';
import { Pool, PoolConnection } from 'mariadb';
import { OkPacket } from 'src/interfaces/interfaces';

@Injectable()
export class MariaDbHelperService {

    /**
     * Ejecuta una función dentro de una transacción.
     * Hace rollback automático si hay error.
     */
    async transaction<T>(pool: Pool, callback: (conn: PoolConnection) => Promise<T>): Promise<T> {
        const conn = await pool.getConnection();
        try {
            await conn.beginTransaction();
            const result = await callback(conn);
            await conn.commit();
            return result;
        } catch (error) {
            await conn.rollback();
            throw error;
        } finally {
            conn.release();
        }
    }

    async batch(pool: Pool, sql: string, paramsArray: any[][], transaction = false): Promise<OkPacket[]> {
        if (transaction) {
            return await this.transaction(pool, async (conn) => {
                return conn.batch(sql, paramsArray);
            });
        }

        const conn = await pool.getConnection();
        try {
            return await conn.batch(sql, paramsArray);
        } finally {
            conn.release();
        }
    }

    private async exec(pool: Pool, sql: string, consoleError: string, params?: any[]): Promise<OkPacket> {
        const conn = await pool.getConnection();
        try {
            const result = await conn.query(sql, params);
            return result;
        } catch (error) {
            console.error(consoleError, error);
            throw error;
        } finally {
            conn.release();
        }
    }

    private async execOk(pool: Pool, sql: string, consoleError: string, params?: any[]): Promise<boolean> {
        const result = await this.exec(pool, sql, consoleError, params);
        return result.affectedRows > 0;
    }

    async insert(pool: Pool, sql: string, params?: any[]): Promise<OkPacket> {
        return await this.exec(pool, sql, 'Database insert failed', params);
    }

    async insertOk(pool: Pool, sql: string, params?: any[]): Promise<boolean> {
        return await this.execOk(pool, sql, 'Database insert failed', params);
    }

    async delete(pool: Pool, sql: string, params?: any[]): Promise<OkPacket> {
        return await this.exec(pool, sql, 'Database delete failed', params);
    }

    async deleteOk(pool: Pool, sql: string, params?: any[]): Promise<boolean> {
        return await this.execOk(pool, sql, 'Database delete failed', params);
    }

    async update(pool: Pool, sql: string, params?: any[]): Promise<OkPacket> {
        return await this.exec(pool, sql, 'Database update failed', params);
    }

    async updateOk(pool: Pool, sql: string, params?: any[]): Promise<boolean> {
        return await this.execOk(pool, sql, 'Database update failed', params);
    }

    async select<T = any>(pool: Pool, sql: string, params?: any[]): Promise<T[] | null> {
        return await this.query(pool, sql, params);
    }

    async selectOne<T = any>(pool: Pool, sql: string, params?: any[]): Promise<T | null> {
        return await this.queryOne(pool, sql, params);
    }

    async query<T = any>(pool: Pool, sql: string, params?: any[]): Promise<T[] | null> {
        const conn = await pool.getConnection();
        try {
            const result = await conn.query<T[]>(sql, params);
            return result.length > 0 ? result : null;
        } catch (error) {
            console.error('Database query failed:', error);
            throw error;
        } finally {
            conn.release();
        }
    }

    async queryOne<T = any>(pool: Pool, sql: string, params?: any[]): Promise<T | null> {
        const conn = await pool.getConnection();
        try {
            const result = await conn.query<T[]>(sql, params);
            return result.length > 0 ? result[0] : null;
        } catch (error) {
            console.error('Database query failed:', error);
            throw error;
        } finally {
            conn.release();
        }
    }

    async ping(pool: Pool): Promise<boolean> {
        let conn: PoolConnection | undefined;
        try {
            conn = await pool.getConnection();
            await conn.query('SELECT 1');
            return true;
        } catch {
            return false;
        } finally {
            if (conn) conn.release();
        }
    }

}