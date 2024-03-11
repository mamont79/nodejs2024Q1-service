import { Controller, Injectable } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Injectable()
@ApiTags('Hello world')
@Controller('demo')
export class AppService {
  @ApiTags('Hello')
  getHello(): string {
    return 'Hello World!';
  }
}
