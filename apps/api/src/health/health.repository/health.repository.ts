import { Inject, Injectable } from '@nestjs/common';
import oracle from 'oracledb';
import { ORACLE_POOL } from '../../database/database.module';


@Injectable()
export class HealthRepository {
    constructor(
        @Inject(ORACLE_POOL) private readonly oraclePool: oracle.Pool,
    ) {}
    async checkDatabaseConnection(): Promise<boolean> {
        const connection = await this.oraclePool.getConnection();
        try {
            const result = await connection.execute('SELECT 1 FROM dual');
            return !!result.rows?.length;
        } catch (error) {
            console.error('Error checking database connection:', error);
            return false;
        } finally {
            await connection.close();
        }
    }
}
