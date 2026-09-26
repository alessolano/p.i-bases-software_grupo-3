import { Inject, Injectable, Logger } from '@nestjs/common';
import oracle from 'oracledb';
import { ORACLE_POOL } from '../../database/database.module';

@Injectable()
export class HealthRepository {
  private readonly logger = new Logger(HealthRepository.name);

  constructor(
    @Inject(ORACLE_POOL) private readonly oraclePool: oracle.Pool,
  ) {}

  async checkDatabaseConnection(): Promise<boolean> {
    let connection: oracle.Connection | undefined;

    try {
      connection = await this.oraclePool.getConnection();
      await connection.execute('SELECT 1 FROM dual');
      return true;
    } catch (error) {
      this.logger.error('Error checking database connection', error);
      return false;
    } finally {
      if (connection) {
        try {
          await connection.close();
        } catch (closeError) {
          this.logger.error('Error closing Oracle connection', closeError);
        }
      }
    }
  }
}