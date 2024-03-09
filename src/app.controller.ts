import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags, ApiOperation, ApiOkResponse } from '@nestjs/swagger';

@Controller()
@ApiTags('Index')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({ summary: 'index entry point' })
  @ApiOkResponse({ description: 'hello message' })
  getHello(): string {
    return this.appService.getHello();
  }
}
