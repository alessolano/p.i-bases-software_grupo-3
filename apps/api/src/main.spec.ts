jest.mock('@nestjs/core', () => ({
  NestFactory: {
    create: jest.fn(),
  },
}));

jest.mock('./app.module', () => ({
  AppModule: class AppModule {},
}));

jest.mock('oracledb', () => ({
  __esModule: true,
  default: {
    initOracleClient: jest.fn(),
  },
}));

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import oracle from 'oracledb';
import {
  buildOracleInitOptions,
  initOracleClient,
  bootstrap,
} from './main';

describe('test the functions from main.ts', () => {
  describe('function buildOracleInitOptions', () => {
    it('when no ORACLE_CLIENT_LIB_DIR is set', () => {
      const options = buildOracleInitOptions();
      expect(options.configDir).toContain('Wallet');
      expect(options.libDir).toBeUndefined();
    });

    it('when ORACLE_CLIENT_LIB_DIR is set', () => {
      process.env.ORACLE_CLIENT_LIB_DIR = '/opt/oracle/instantclient';
      const options = buildOracleInitOptions();
      expect(options.configDir).toContain('Wallet');
      expect(options.libDir).toBe('/opt/oracle/instantclient');
    });
  });

  describe('function initOracleClient', () => {
    it('initialize the oracle client', () => {
      (oracle.initOracleClient as jest.Mock).mockImplementation(() => undefined);

      initOracleClient();

      expect(oracle.initOracleClient).toHaveBeenCalledWith(
        expect.objectContaining({
          configDir: expect.stringContaining('Wallet'),
        }),
      );
    });
  });

  describe('function bootstrap', () => {
    const createMockApp = () => ({
      enableShutdownHooks: jest.fn(),
      listen: jest.fn().mockResolvedValue(undefined),
    });

    it('listens on 3000', async () => {
      const app = createMockApp();
      (NestFactory.create as jest.Mock).mockResolvedValue(app);

      await bootstrap();

      expect(NestFactory.create).toHaveBeenCalledWith(AppModule);
      expect(app.enableShutdownHooks).toHaveBeenCalled();
      expect(app.listen).toHaveBeenCalledWith(3000);
    });

    it('listens on PORT when it is set', async () => {
      process.env.PORT = '8080';
      const app = createMockApp();
      (NestFactory.create as jest.Mock).mockResolvedValue(app);

      await bootstrap();

      expect(app.listen).toHaveBeenCalledWith('8080');
    });
  });
});