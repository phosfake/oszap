import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ZapTrigger } from 'src/model/zap/zap-trigger.model';
import { Zap } from 'src/model/zap/zap.model';
import { ICreateZapParams, ZapsController } from './zaps.controller';
import { ZapsService } from './zaps.service';

describe('ZapsController', () => {
  let controller: ZapsController;
  let zapsService: ZapsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ZapsController],
      providers: [
        {
          provide: ZapsService,
          useValue: {
            get: jest.fn(),
            create: jest.fn()
          }
        }
      ]
    }).compile();

    controller = module.get<ZapsController>(ZapsController);
    zapsService = module.get<ZapsService>(ZapsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('get', () => {
    it('should return bad request when no id specified', async () => {
      await expect(controller.get(null)).rejects.toThrowError(
        NotFoundException
      );
    });

    it('should return a record when id is specified', async () => {
      const id = 'ABC123';
      const expectedValue: Zap = {
        id: id,
        name: 'test zap',
        states: [],
        trigger: {
          type: '',
          condition1: 1
        },
        actions: [],
        createdOn: new Date()
      };

      jest.spyOn(zapsService, 'get').mockResolvedValue({
        id: id,
        name: 'test zap',
        states: [],
        trigger: {
          type: '',
          condition1: 1
        },
        actions: [],
        createdOn: new Date()
      });

      expect(await controller.get(id)).toEqual(expectedValue);
    });
  });

  describe('create', () => {
    it('should return a created zap', async () => {
      const createParams: ICreateZapParams = {
        name: 'test Zap name',
        description: 'test Zap description',
        trigger: new ZapTrigger(),
        states: [],
        actions: []
      };

      const timestamp = new Date();
      const expectedValue: Zap = {
        name: 'test zap Name',
        description: 'test Zap description',
        trigger: new ZapTrigger(),
        states: [],
        actions: [],
        createdOn: timestamp
      };

      jest.spyOn(zapsService, 'create').mockResolvedValue({
        name: 'test zap Name',
        description: 'test Zap description',
        trigger: new ZapTrigger(),
        states: [],
        actions: [],
        createdOn: timestamp
      });

      const created = await controller.create(createParams);

      expect(created).toEqual(expectedValue);
    });
  });
});
