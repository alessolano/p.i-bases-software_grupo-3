import { Test, TestingModule } from '@nestjs/testing';
import { HealthRepository } from './health.repository';

describe('HealthRepository', () => {
  let provider: HealthRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HealthRepository],
    }).compile();

    provider = module.get<HealthRepository>(HealthRepository);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
