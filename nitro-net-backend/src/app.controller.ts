import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AppService } from './app.service';

@ApiTags('Status') // Agrupamos con glamour
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({ summary: 'Chequeo del estado de la base de datos' })
  @ApiResponse({ status: 200, description: 'Base de datos conectada y funcionando' })
  @ApiResponse({ status: 503, description: 'Base de datos no disponible' })
  async checkDbStatus() {
    return await this.appService.checkDbStatus();
  }
}
