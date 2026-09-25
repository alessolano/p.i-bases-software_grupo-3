import { Inject, Injectable } from '@nestjs/common';
import oracle from 'oracledb';
import { ORACLE_POOL } from '../database/database.module';

@Injectable()
export class UsersRepository {
  constructor(@Inject(ORACLE_POOL) private readonly oraclePool: oracle.Pool) {}

  async clientEmailExists(email: string): Promise<boolean> {
    const connection = await this.oraclePool.getConnection();

    try {
      const result = await connection.execute(
        'SELECT 1 AS FOUND FROM CLIENTS WHERE EMAIL = :email AND ROWNUM = 1',
        { email },
      );

      return !!result.rows?.length;
    } finally {
      await connection.close();
    }
  }
}
