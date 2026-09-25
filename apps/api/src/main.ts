import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import oracle from 'oracledb';
import path from 'node:path';


export function buildOracleInitOptions(): oracle.InitialiseOptions {
  const initOptions: oracle.InitialiseOptions = {
    configDir: path.resolve(__dirname, '../Wallet'),
  };

  if (process.env.ORACLE_CLIENT_LIB_DIR) {
    initOptions.libDir = process.env.ORACLE_CLIENT_LIB_DIR;
  }

  return initOptions;
}

export function initOracleClient(): void {
  try {
    const initOptions = buildOracleInitOptions();
    oracle.initOracleClient(initOptions);
  } catch (error) {
    console.error('Error initializing Oracle client:', error);
    process.exit(1);
  }
}

export async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableShutdownHooks();
  await app.listen(process.env.PORT ?? 3000);
  return app;
}

if (require.main === module) {
  initOracleClient();
  void bootstrap();
}
