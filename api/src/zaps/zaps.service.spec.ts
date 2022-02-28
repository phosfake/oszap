import { Test, TestingModule } from '@nestjs/testing';
import { ZapsService } from './zaps.service';

describe('ZapsService', () => {
  let service: ZapsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ZapsService],
    }).compile();

    service = module.get<ZapsService>(ZapsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
