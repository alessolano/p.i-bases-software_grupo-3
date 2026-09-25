import { Test, TestingModule } from '@nestjs/testing';
import { ORACLE_POOL } from '../database/database.module';
import { UsersRepository } from './users.repository';

describe('UsersRepository', () => {
  let module: TestingModule;
  let repository: UsersRepository;
  const connection = {
    execute: jest.fn(),
    close: jest.fn(),
  };
  const pool = {
    getConnection: jest.fn(),
  };

  beforeEach(async () => {
    jest.resetAllMocks();
    connection.execute.mockResolvedValue({ rows: [] });
    connection.close.mockResolvedValue(undefined);
    pool.getConnection.mockResolvedValue(connection);

    module = await Test.createTestingModule({
      providers: [UsersRepository, { provide: ORACLE_POOL, useValue: pool }],
    }).compile();

    repository = module.get(UsersRepository);
  });

  afterEach(async () => {
    await module.close();
  });

  describe('clientEmailExists', () => {
    it('returns true when the email belongs to a client and releases the connection', async () => {
      connection.execute.mockResolvedValue({ rows: [{ FOUND: 1 }] });

      await expect(
        repository.clientEmailExists('cliente@example.com'),
      ).resolves.toBe(true);

      expect(pool.getConnection).toHaveBeenCalledTimes(1);
      expect(connection.close).toHaveBeenCalledTimes(1);
    });

    it('returns false when no client has the email and releases the connection', async () => {
      await expect(
        repository.clientEmailExists('nuevo@example.com'),
      ).resolves.toBe(false);

      expect(connection.close).toHaveBeenCalledTimes(1);
    });

    it('returns false if Oracle provides no rows', async () => {
      connection.execute.mockResolvedValue({});

      await expect(
        repository.clientEmailExists('cliente@example.com'),
      ).resolves.toBe(false);

      expect(connection.close).toHaveBeenCalledTimes(1);
    });

    it('binds the email as data without interpolating it into SQL', async () => {
      const email = "cliente@example.com' OR '1' = '1";

      await repository.clientEmailExists(email);

      expect(connection.execute).toHaveBeenCalledTimes(1);
      expect(connection.execute).toHaveBeenCalledWith(
        'SELECT 1 AS FOUND FROM CLIENTS WHERE EMAIL = :email AND ROWNUM = 1',
        { email },
      );
    });

    it('propagates query errors and still releases the connection', async () => {
      const error = new Error('Query failed');
      connection.execute.mockRejectedValue(error);

      await expect(
        repository.clientEmailExists('cliente@example.com'),
      ).rejects.toBe(error);

      expect(connection.close).toHaveBeenCalledTimes(1);
    });

    it('propagates acquisition errors without trying to use a connection', async () => {
      const error = new Error('Pool unavailable');
      pool.getConnection.mockRejectedValue(error);

      await expect(
        repository.clientEmailExists('cliente@example.com'),
      ).rejects.toBe(error);

      expect(connection.execute).not.toHaveBeenCalled();
      expect(connection.close).not.toHaveBeenCalled();
    });

    it('propagates errors when releasing the connection', async () => {
      const error = new Error('Connection release failed');
      connection.close.mockRejectedValue(error);

      await expect(
        repository.clientEmailExists('cliente@example.com'),
      ).rejects.toBe(error);

      expect(connection.close).toHaveBeenCalledTimes(1);
    });
  });
});
