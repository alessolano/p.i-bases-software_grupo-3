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
});
