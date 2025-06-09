import { Controller, Get, Post, Body, Param, Patch, Delete, ParseIntPipe } from '@nestjs/common';
import { SensorsService } from './sensors.service';
import { CreateSensorDto } from './dto/sensor/create-sensor.dto';
import { UpdateSensorDto } from './dto/sensor/update-sensor.dto';
import { UpdateSensorCocheDto } from './dto/sensor-coche/update-sensor-coche.dto';
import { CreateLecturaDto } from './dto/lectura/create-lectura.dto';
import { CreateSensorCocheDto } from './dto/sensor-coche/create-sensor-coche.dto';

@Controller('sensors')
export class SensorsController {
  constructor(
    private readonly sensorsService: SensorsService
  ) { }

  // -------- SENSORES --------
  @Post()
  createSensor(@Body() dto: CreateSensorDto) {
    return this.sensorsService.createSensor(dto);
  }

  @Get()
  getAllSensores() {
    return this.sensorsService.getAllSensores();
  }

  @Get(':id')
  getSensorById(@Param('id', ParseIntPipe) id: number) {
    return this.sensorsService.getSensorById(id);
  }

  @Patch(':id')
  updateSensor(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateSensorDto) {
    return this.sensorsService.updateSensor(id, dto);
  }

  @Delete(':id')
  deleteSensor(@Param('id', ParseIntPipe) id: number) {
    return this.sensorsService.deleteSensor(id);
  }

  // -------- SENSORES_COCHE --------
  @Post('car')
  createSensorCoche(@Body() dto: CreateSensorCocheDto) {
    return this.sensorsService.createSensorCoche(dto);
  }

  @Get('car/:id_coche')
  getSensoresByCoche(@Param('id_coche', ParseIntPipe) id_coche: number) {
    return this.sensorsService.getSensoresByCoche(id_coche);
  }

  @Patch('car/:id')
  updateSensorCoche(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateSensorCocheDto) {
    return this.sensorsService.updateSensorCoche(id, dto);
  }

  @Delete('car/:id')
  deleteSensorCoche(@Param('id', ParseIntPipe) id: number) {
    return this.sensorsService.deleteSensorCoche(id);
  }

  // -------- LECTURAS --------
  @Post('reading')
  createLectura(@Body() dto: CreateLecturaDto) {
    return this.sensorsService.createLectura(dto);
  }

  @Get('reading/:id_sensor_coche')
  getLecturasBySensorCoche(@Param('id_sensor_coche', ParseIntPipe) id_sensor_coche: number) {
    return this.sensorsService.getLecturasBySensorCoche(id_sensor_coche);
  }
}
