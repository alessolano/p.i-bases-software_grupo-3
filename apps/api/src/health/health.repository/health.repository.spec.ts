import { Test, TestingModule } from '@nestjs/testing';
import { HealthRepository } from './health.repository';
import { ORACLE_POOL } from '../../database/database.module';

describe('HealthRepository', () => {
  let provider: HealthRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HealthRepository, {
        provide: ORACLE_POOL,
        useValue: {
          getConnection: jest.fn().mockResolvedValue({
            close: jest.fn(),
          }),
        },
      }],
    }).compile();

    provider = module.get<HealthRepository>(HealthRepository);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });

  describe('checkDatabaseConnection', () => {
    it('should return true when the database connection is successful', async () => {
      const mockConnection = {
        execute: jest.fn().mockResolvedValue({ rows: [1] }),
        close: jest.fn(),
      };
      (provider as any).oraclePool.getConnection = jest.fn().mockResolvedValue(mockConnection);

      const result = await provider.checkDatabaseConnection();
      expect(result).toBe(true);
      expect(mockConnection.execute).toHaveBeenCalledWith('SELECT 1 FROM dual');
      expect(mockConnection.close).toHaveBeenCalled();
    });

    it('should return false when the database connection fails', async () => {
      const consoleError = jest
        .spyOn(console, 'error')
        .mockImplementation(() => undefined);
      const mockConnection = {
        execute: jest.fn().mockRejectedValue(new Error('Database error')),
        close: jest.fn(),
      };
      (provider as any).oraclePool.getConnection = jest.fn().mockResolvedValue(mockConnection);
      const result = await provider.checkDatabaseConnection();
      expect(result).toBe(false);
      expect(consoleError).toHaveBeenCalledWith(
        'Error checking database connection:',
        expect.any(Error),
      );
      consoleError.mockRestore();
    });
  });
});
