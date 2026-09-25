import { Module } from '@nestjs/common';
import { HealthModule } from './health/health.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [HealthModule, DatabaseModule, ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: '.env',
  })],
})
export class AppModule {}
