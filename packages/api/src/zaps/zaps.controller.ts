import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post
} from '@nestjs/common';
import { IZapAction } from 'src/model/zap/zap-action.model';
import { IZapState } from 'src/model/zap/zap-state.model';
import { ZapTrigger } from 'src/model/zap/zap-trigger.model';
import { Zap } from 'src/model/zap/zap.model';
import { ZapsService } from './zaps.service';

@Controller('zaps')
export class ZapsController {
  constructor(private zapsService: ZapsService) {}

  @Get(':id')
  async get(@Param('id') id: string): Promise<Zap> {
    if (!id) {
      throw new NotFoundException();
    }
    return this.zapsService.get(id);
  }

  @Post()
  async create(@Body() createZapParams: ICreateZapParams): Promise<Zap> {
    const zap: Zap = new Zap();
    zap.name = createZapParams.name;
    zap.trigger = new ZapTrigger();
    zap.trigger.type = createZapParams.trigger.type;
    zap.trigger.condition1 = createZapParams.trigger.condition1;
    zap.states = createZapParams.states;
    zap.actions = createZapParams.actions;

    return this.zapsService.create(zap);
  }
}
export interface ICreateZapParams {
  name: string;
  description?: string;
  trigger: ZapTrigger;
  states: IZapState[];
  actions: IZapAction[];
}
