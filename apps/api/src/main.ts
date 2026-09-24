import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import oracle from 'oracledb';
import path from 'node:path';

const initOptions: oracle.InitialiseOptions = {
  configDir: path.resolve(__dirname, '../Wallet'),
};

if (process.env.ORACLE_CLIENT_LIB_DIR) {
  initOptions.libDir = process.env.ORACLE_CLIENT_LIB_DIR;
}

try {
  oracle.initOracleClient(initOptions);
  console.log('Oracle client initialized successfully.');
} catch (error) {
  console.error('Error initializing Oracle client:', error);
  process.exit(1);
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableShutdownHooks();
  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
