import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { SensorsRepository } from './sensors.repository';
import { CreateSensorDto } from './dto/sensor/create-sensor.dto';
import { UpdateSensorDto } from './dto/sensor/update-sensor.dto';
import { CreateSensorCocheDto } from './dto/sensor-coche/create-sensor-coche.dto';
import { UpdateSensorCocheDto } from './dto/sensor-coche/update-sensor-coche.dto';
import { CreateLecturaDto } from './dto/lectura/create-lectura.dto';

@Injectable()
export class SensorsService {
  constructor(
    private readonly sensorsRepository: SensorsRepository,
  ) {}

  // -------- SENSORES --------
  async createSensor(dto: CreateSensorDto) {
    // Comprobar si ya existe un sensor con el mismo nombre y tipo
    const existing = await this.sensorsRepository.getSensorByNombreAndTipo(dto.nombre, dto.tipo);
    if (existing) {
      throw new BadRequestException('Ya existe un sensor con ese nombre y tipo');
    }
    return this.sensorsRepository.createSensor(dto);
  }

  getAllSensores() {
    return this.sensorsRepository.getAllSensores();
  }

  async getSensorById(id: number) {
    const sensor = await this.sensorsRepository.getSensorById(id);
    if (!sensor) throw new NotFoundException('Sensor no encontrado');
    return sensor;
  }

  async updateSensor(id: number, dto: UpdateSensorDto) {
    // Si se actualiza el nombre o tipo, comprobar duplicados
    if (dto.nombre !== undefined && dto.tipo !== undefined) {
      const existing = await this.sensorsRepository.getSensorByNombreAndTipo(dto.nombre, dto.tipo);
      if (existing && existing.id !== id) {
        throw new BadRequestException('Ya existe un sensor con ese nombre y tipo');
      }
    }
    const updated = await this.sensorsRepository.updateSensor(id, dto);
    if (!updated) throw new NotFoundException('Sensor no encontrado');
    return updated;
  }

  async deleteSensor(id: number) {
    const deleted = await this.sensorsRepository.deleteSensor(id);
    if (!deleted) throw new NotFoundException('Sensor no encontrado');
    return { message: 'Sensor eliminado' };
  }

  // -------- SENSORES_COCHE --------
  async createSensorCoche(dto: CreateSensorCocheDto) {
    // Comprobar si ya existe ese sensor en ese coche y ubicación
    const existing = await this.sensorsRepository.getSensorCocheByUnique(dto.id_coche, dto.id_sensor, dto.ubicacion);
    if (existing) {
      throw new BadRequestException('Ya existe ese sensor en ese coche y ubicación');
    }
    return this.sensorsRepository.createSensorCoche(dto);
  }

  getSensoresByCoche(id_coche: number) {
    return this.sensorsRepository.getSensoresByCoche(id_coche);
  }

  async updateSensorCoche(id: number, dto: UpdateSensorCocheDto) {
    const updated = await this.sensorsRepository.updateSensorCoche(id, dto);
    if (!updated) throw new NotFoundException('Sensor-coche no encontrado');
    return updated;
  }

  async deleteSensorCoche(id: number) {
    const deleted = await this.sensorsRepository.deleteSensorCoche(id);
    if (!deleted) throw new NotFoundException('Sensor-coche no encontrado');
    return { message: 'Sensor-coche eliminado' };
  }

  // -------- LECTURAS --------
  async createLectura(dto: CreateLecturaDto) {
    // Puedes añadir validaciones adicionales aquí si lo necesitas
    return this.sensorsRepository.createLectura(dto);
  }

  getLecturasBySensorCoche(id_sensor_coche: number) {
    return this.sensorsRepository.getLecturasBySensorCoche(id_sensor_coche);
  }
}
