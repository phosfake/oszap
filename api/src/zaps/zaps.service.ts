import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { IZap } from '../../../model/zap.model';

@Injectable()
export class ZapsService {
  public get(id: string): Observable<IZap> {
    throw new Error('Method is not defined ' + id);
  }
}
