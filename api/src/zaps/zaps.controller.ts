import { Controller, Get, Param } from '@nestjs/common';
import { Observable } from 'rxjs';
import { IZap } from '../../../model/zap.model';
import { ZapsService } from './zaps.service';

@Controller('zaps')
export class ZapsController {
  constructor(private zapsService: ZapsService) {}

  @Get(':id')
  get(@Param('id') id: string): Observable<IZap> {
    return this.zapsService.get(id);
  }
}
