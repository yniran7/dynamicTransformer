import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TransformerService } from './transform.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, TransformerService],
})
export class AppModule {}
