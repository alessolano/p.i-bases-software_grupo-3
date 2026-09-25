jest.mock('oracledb', () => ({
  __esModule: true,
  default: {
    OUT_FORMAT_OBJECT: 4002,
    outFormat: undefined,
    createPool: jest.fn(),
  },
}));

import oracle from 'oracledb';
import { ConfigService } from '@nestjs/config';
import { createOraclePool } from './database.module';

describe('createOraclePool', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('creates a pool from config', async () => {
    const pool = { close: jest.fn() };
    (oracle.createPool as jest.Mock).mockResolvedValue(pool);

    const config = {
      getOrThrow: jest.fn((key: string) =>
        ({
          DB_USER: 'user',
          DB_PASSWORD: 'pass',
          DB_CONNECTION_STRING: 'db.example.com/xepdb1',
        })[key],
      ),
    } as unknown as ConfigService;

    await expect(createOraclePool(config)).resolves.toBe(pool);
    expect(oracle.outFormat).toBe(oracle.OUT_FORMAT_OBJECT);
    expect(oracle.createPool).toHaveBeenCalledWith({
      user: 'user',
      password: 'pass',
      connectString: 'db.example.com/aasasa',
      poolMin: 2,
      poolMax: 10,
      poolIncrement: 1,
    });
  });
});