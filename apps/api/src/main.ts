import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import oracle from 'oracledb';
import path from 'node:path';

oracle.initOracleClient({
  configDir: path.resolve(__dirname, '../Wallet'),
});

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableShutdownHooks();
  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
