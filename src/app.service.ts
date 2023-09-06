import { Injectable } from '@nestjs/common';
import { TransformerService } from './transform.service';
import { schema } from './schema';

@Injectable()
export class AppService {
  constructor(private readonly transform: TransformerService) {}

  getHello() {
    return this.transform.transform(schema.source);
  }
}
