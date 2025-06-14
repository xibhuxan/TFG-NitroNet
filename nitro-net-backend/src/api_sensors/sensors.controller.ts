import { Controller, Get, Post, Body, Param, Patch, Delete, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { SensorsService } from './sensors.service';
import { CreateSensorDto } from './dto/sensor/create-sensor.dto';
import { UpdateSensorDto } from './dto/sensor/update-sensor.dto';
import { UpdateSensorCocheDto } from './dto/sensor-coche/update-sensor-coche.dto';
import { CreateLecturaDto } from './dto/lectura/create-lectura.dto';
import { CreateSensorCocheDto } from './dto/sensor-coche/create-sensor-coche.dto';

@ApiTags('Sensores')  // Agrupa todo lo relacionado con sensores, sexy y ordenado
@Controller('sensors')
export class SensorsController {
  constructor(private readonly sensorsService: SensorsService) {}

  // -------- SENSORES --------
  @Post()
  @ApiOperation({ summary: 'Crear un nuevo sensor' })
  @ApiResponse({ status: 201, description: 'Sensor creado exitosamente.' })
  createSensor(@Body() dto: CreateSensorDto) {
    return this.sensorsService.createSensor(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los sensores' })
  @ApiResponse({ status: 200, description: 'Lista de sensores obtenida.' })
  getAllSensores() {
    return this.sensorsService.getAllSensores();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener sensor por ID' })
  @ApiParam({ name: 'id', description: 'ID del sensor', type: Number })
  @ApiResponse({ status: 200, description: 'Sensor encontrado.' })
  @ApiResponse({ status: 404, description: 'Sensor no encontrado.' })
  getSensorById(@Param('id', ParseIntPipe) id: number) {
    return this.sensorsService.getSensorById(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar sensor por ID' })
  @ApiParam({ name: 'id', description: 'ID del sensor a actualizar', type: Number })
  @ApiResponse({ status: 200, description: 'Sensor actualizado correctamente.' })
  updateSensor(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateSensorDto) {
    return this.sensorsService.updateSensor(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar sensor por ID' })
  @ApiParam({ name: 'id', description: 'ID del sensor a eliminar', type: Number })
  @ApiResponse({ status: 200, description: 'Sensor eliminado.' })
  deleteSensor(@Param('id', ParseIntPipe) id: number) {
    return this.sensorsService.deleteSensor(id);
  }

  // -------- SENSORES_COCHE --------
  @Post('car')
  @ApiOperation({ summary: 'Asignar sensor a un coche' })
  @ApiResponse({ status: 201, description: 'Sensor asignado al coche.' })
  createSensorCoche(@Body() dto: CreateSensorCocheDto) {
    return this.sensorsService.createSensorCoche(dto);
  }

  @Get('car/:id_coche')
  @ApiOperation({ summary: 'Obtener sensores asignados a un coche' })
  @ApiParam({ name: 'id_coche', description: 'ID del coche', type: Number })
  @ApiResponse({ status: 200, description: 'Lista de sensores del coche.' })
  getSensoresByCoche(@Param('id_coche', ParseIntPipe) id_coche: number) {
    return this.sensorsService.getSensoresByCoche(id_coche);
  }

  @Patch('car/:id')
  @ApiOperation({ summary: 'Actualizar sensor asignado a coche' })
  @ApiParam({ name: 'id', description: 'ID de la asignación sensor-coche', type: Number })
  @ApiResponse({ status: 200, description: 'Asignación actualizada.' })
  updateSensorCoche(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateSensorCocheDto) {
    return this.sensorsService.updateSensorCoche(id, dto);
  }

  @Delete('car/:id')
  @ApiOperation({ summary: 'Eliminar sensor asignado a coche' })
  @ApiParam({ name: 'id', description: 'ID de la asignación sensor-coche', type: Number })
  @ApiResponse({ status: 200, description: 'Asignación eliminada.' })
  deleteSensorCoche(@Param('id', ParseIntPipe) id: number) {
    return this.sensorsService.deleteSensorCoche(id);
  }

  // -------- LECTURAS --------
  @Post('reading')
  @ApiOperation({ summary: 'Registrar una nueva lectura de sensor' })
  @ApiResponse({ status: 201, description: 'Lectura registrada.' })
  createLectura(@Body() dto: CreateLecturaDto) {
    return this.sensorsService.createLectura(dto);
  }

  @Get('reading/:id_sensor_coche')
  @ApiOperation({ summary: 'Obtener lecturas de un sensor asignado a coche' })
  @ApiParam({ name: 'id_sensor_coche', description: 'ID de la asignación sensor-coche', type: Number })
  @ApiResponse({ status: 200, description: 'Lecturas obtenidas.' })
  getLecturasBySensorCoche(@Param('id_sensor_coche', ParseIntPipe) id_sensor_coche: number) {
    return this.sensorsService.getLecturasBySensorCoche(id_sensor_coche);
  }
}
