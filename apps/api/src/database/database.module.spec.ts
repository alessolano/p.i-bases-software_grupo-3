jest.mock('oracledb', () => ({
  __esModule: true,
  default: {
    createPool: jest.fn(),
    OUT_FORMAT_OBJECT: 4002,
    outFormat: undefined,
  },
}));

import oracle from 'oracledb';
import { ConfigService } from '@nestjs/config';
import { createOraclePool } from './database.module';

describe('createOraclePool', () => {
  // Arrange
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('creates a pool from config', async () => {
    // Arrange
    // We create a pool object
    const pool = {};
    // We mock oracle's createPool function
    const createPoolMock = oracle.createPool as jest.Mock;
    // Whenever we call createPoolMock we return this pool object
    createPoolMock.mockResolvedValue(pool);
    // We create some fake values for config
    const fakeValues = {
      DB_USER: 'user',
      DB_PASSWORD: 'pass',
      DB_CONNECTION_STRING: 'db.example.com/aasasa',
    };
    // We get the type of the keys
    type ConfigKey = keyof typeof fakeValues;
    // We mock getOrThrow so we can pass a configService
    const getOrThrowMock = jest.fn(
      (key: string) => {
        return fakeValues[key as ConfigKey];
      }
    );
    // We fake a configService
    const config = {
      getOrThrow: getOrThrowMock,
    } as unknown as ConfigService;
    // We pass the fake config to our function
    const result = await createOraclePool(config);
    // We expect the promised result to be pool, because me mocked oracles function
    await expect(result).toBe(pool);
    // We expect oracles function to have been called with our fake config
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