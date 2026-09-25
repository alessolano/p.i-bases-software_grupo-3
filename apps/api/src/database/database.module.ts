import { Global, Module, OnApplicationShutdown, Inject } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import oracle from 'oracledb';
import { DatabaseController } from './database.controller';
import { DatabaseService } from './database.service';

export async function createOraclePool(configService: ConfigService) {
  oracle.outFormat = oracle.OUT_FORMAT_OBJECT;

  return oracle.createPool({
    user: configService.getOrThrow<string>('DB_USER'),
    password: configService.getOrThrow<string>('DB_PASSWORD'),
    connectString: configService.getOrThrow<string>('DB_CONNECTION_STRING'),
    poolMin: 2,
    poolMax: 10,
    poolIncrement: 1,
  });
}

export const ORACLE_POOL = 'ORACLE_POOL';

@Global()
@Module({
  imports: [ConfigModule],
  controllers: [DatabaseController],
  providers: [
    DatabaseService,
    {
      provide: ORACLE_POOL,
      inject: [ConfigService],
      useFactory: createOraclePool,
    },
  ],
  exports: [ORACLE_POOL],
})
export class DatabaseModule implements OnApplicationShutdown {
  constructor(
    @Inject(ORACLE_POOL) private readonly pool: oracle.Pool,
  ) {}

  async onApplicationShutdown() {
    try {
      await this.pool.close(0);
      console.log('Oracle connection pool closed successfully.');
    } catch (error) {
      console.error('Error closing Oracle pool:', error);
    }
  }
}