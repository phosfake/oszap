import { Test, TestingModule } from '@nestjs/testing';
import { ZapsController } from './zaps.controller';
import { IZap } from '../../../model/zap.model';
import { ZapsService } from './zaps.service';
import { Observable, of } from 'rxjs';

describe('ZapsController', () => {
  let controller: ZapsController;
  let zapsService: ZapsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ZapsController],
      providers: [ZapsService],
    }).compile();

    controller = module.get<ZapsController>(ZapsController);
    zapsService = module.get<ZapsService>(ZapsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('get', () => {
    it('should return bad request when no id specified', async () => {
      try {
        await controller.get(null);
      } catch (error) {
        expect(error).toBeTruthy();
        return;
      }
      fail();
    });

    it('should return a record when id is specified', () => {
      const id = 'ABC123';
      const expectedValue: Observable<IZap> = of({
        id: id,
        name: 'test zap',
        states: [],
        trigger: [],
        actions: [],
      });
      jest.spyOn(zapsService, 'get').mockImplementation(() => expectedValue);
      expect(controller.get(id)).toEqual(expectedValue);
    });
  });
});
