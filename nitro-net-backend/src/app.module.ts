import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './api_auth/auth.module';
import { PublicModule } from './api_public/public.module';
import { CarsModule } from './api_cars/cars.module';
import { SensorsModule } from './api_sensors/sensors.module';
import { AppRepository } from './app.repository';
import { DatabaseModule } from './database/database.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [AuthModule, PublicModule, CarsModule, SensorsModule, DatabaseModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'nitronet-login', 'dist'),
      serveRoot: '/',
      exclude: ['/api*'],
    })
  ],
  controllers: [AppController],
  providers: [
    AppService, 
    AppRepository,
  ],
})
export class AppModule {}
