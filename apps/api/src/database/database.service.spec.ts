import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import * as oracledb from 'oracledb';
import { DatabaseService } from './database.service';

// Mock completo del módulo oracledb — nada de esto toca la red real
jest.mock('oracledb', () => ({
  createPool: jest.fn(),
  OUT_FORMAT_OBJECT: 'OBJECT',
}));

describe('DatabaseService', () => {
  let service: DatabaseService;
  let mockConnection: { execute: jest.Mock; close: jest.Mock };
  let mockPool: { getConnection: jest.Mock };

  beforeEach(async () => {
    mockConnection = {
      execute: jest.fn(),
      close: jest.fn(),
    };
    mockPool = {
      getConnection: jest.fn().mockResolvedValue(mockConnection),
    };
    (oracledb.createPool as jest.Mock).mockResolvedValue(mockPool);

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DatabaseService,
        {
          provide: ConfigService,
          useValue: {
            getOrThrow: jest.fn((key: string) => `mock-${key}`),
            get: jest.fn(() => undefined), // DB_SCHEMA vacío por defecto
          },
        },
      ],
    }).compile();

    service = module.get<DatabaseService>(DatabaseService);

    // query() necesita el pool ya inicializado. Simulamos también el
    // SELECT de verificación que corre onModuleInit al arrancar.
    mockConnection.execute.mockResolvedValueOnce({ rows: [{ schema: 'MOCK_SCHEMA' }] });
    await service.onModuleInit();
    mockConnection.execute.mockReset();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('query', () => {
    it('executes SQL and always closes the connection', async () => {
      mockConnection.execute.mockResolvedValue({ rows: [{ id: 1 }] });

      const result = await service.query('SELECT 1 FROM dual');

      expect(mockPool.getConnection).toHaveBeenCalled();
      expect(mockConnection.execute).toHaveBeenCalledWith(
        'SELECT 1 FROM dual',
        {},
        expect.objectContaining({ autoCommit: true }),
      );
      expect(mockConnection.close).toHaveBeenCalled();
      expect(result.rows).toEqual([{ id: 1 }]);
    });

    it('closes the connection even if execute throws', async () => {
      mockConnection.execute.mockRejectedValue(new Error('boom'));

      await expect(service.query('SELECT 1 FROM dual')).rejects.toThrow('boom');
      expect(mockConnection.close).toHaveBeenCalled();
    });
  });
});