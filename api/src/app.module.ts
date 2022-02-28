import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ZapsController } from './zaps/zaps.controller';
import { ZapsService } from './zaps/zaps.service';

@Module({
  imports: [],
  controllers: [AppController, ZapsController],
  providers: [AppService, ZapsService],
})
export class AppModule {}
