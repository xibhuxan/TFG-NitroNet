import { Inject, Injectable } from "@nestjs/common";
import { MariaDbHelperService } from "src/database/mariadb-helper.service";
import * as mariadb from 'mariadb';
import { CreateSensorDto } from './dto/sensor/create-sensor.dto';
import { UpdateSensorDto } from './dto/sensor/update-sensor.dto';
import { CreateSensorCocheDto } from './dto/sensor-coche/create-sensor-coche.dto';
import { UpdateSensorCocheDto } from './dto/sensor-coche/update-sensor-coche.dto';
import { CreateLecturaDto } from './dto/lectura/create-lectura.dto';

@Injectable()
export class SensorsRepository {
  constructor(
    @Inject('NITRONET_DB') private readonly nitronetDb: mariadb.Pool,
    private readonly dbHelper: MariaDbHelperService,
  ) {}

  // -------- SENSORES --------
  async createSensor(dto: CreateSensorDto) {
    const query = `
      INSERT INTO sensores (nombre, unidad, tipo)
      VALUES (?, ?, ?)
    `;
    const params = [dto.nombre, dto.unidad, dto.tipo];
    const result = await this.dbHelper.insert(this.nitronetDb, query, params);
    return { id: result.insertId, ...dto };
  }

  async getAllSensores() {
    const query = `SELECT * FROM sensores`;
    return this.dbHelper.select(this.nitronetDb, query);
  }

  async getSensorById(id: number) {
    const query = `SELECT * FROM sensores WHERE id = ?`;
    return this.dbHelper.selectOne(this.nitronetDb, query, [id]);
  }

  async getSensorByNombreAndTipo(nombre: string, tipo: string) {
    if (!nombre || !tipo) return null;
    const query = `SELECT * FROM sensores WHERE nombre = ? AND tipo = ?`;
    return this.dbHelper.selectOne(this.nitronetDb, query, [nombre, tipo]);
  }

  async updateSensor(id: number, dto: UpdateSensorDto) {
    const fields: string[] = [];
    const params: any[] = [];
    for (const key in dto) {
      if (dto[key] !== undefined) {
        fields.push(`${key} = ?`);
        params.push(dto[key]);
      }
    }
    if (fields.length === 0) return null;
    const query = `UPDATE sensores SET ${fields.join(', ')} WHERE id = ?`;
    params.push(id);
    const result = await this.dbHelper.insertOk(this.nitronetDb, query, params);
    return result ? { id, ...dto } : null;
  }

  async deleteSensor(id: number) {
    const query = `DELETE FROM sensores WHERE id = ?`;
    return this.dbHelper.insertOk(this.nitronetDb, query, [id]);
  }

  // -------- SENSORES_COCHE --------
  async createSensorCoche(dto: CreateSensorCocheDto) {
    const query = `
      INSERT INTO sensores_coche (id_coche, id_sensor, ubicacion)
      VALUES (?, ?, ?)
    `;
    const params = [dto.id_coche, dto.id_sensor, dto.ubicacion || null];
    const result = await this.dbHelper.insert(this.nitronetDb, query, params);
    return { id: result.insertId, ...dto };
  }

  async getSensoresByCoche(id_coche: number) {
    const query = `
      SELECT sc.*, s.nombre, s.unidad, s.tipo
      FROM sensores_coche sc
      INNER JOIN sensores s ON sc.id_sensor = s.id
      WHERE sc.id_coche = ?
    `;
    return this.dbHelper.select(this.nitronetDb, query, [id_coche]);
  }

  async getSensorCocheByUnique(id_coche: number, id_sensor: number, ubicacion?: string) {
    const query = `
      SELECT * FROM sensores_coche
      WHERE id_coche = ? AND id_sensor = ? AND (ubicacion = ? OR (? IS NULL AND ubicacion IS NULL))
    `;
    return this.dbHelper.selectOne(this.nitronetDb, query, [id_coche, id_sensor, ubicacion || null, ubicacion || null]);
  }

  async updateSensorCoche(id: number, dto: UpdateSensorCocheDto) {
    const fields: string[] = [];
    const params: any[] = [];
    for (const key in dto) {
      if (dto[key] !== undefined) {
        fields.push(`${key} = ?`);
        params.push(dto[key]);
      }
    }
    if (fields.length === 0) return null;
    const query = `UPDATE sensores_coche SET ${fields.join(', ')} WHERE id = ?`;
    params.push(id);
    const result = await this.dbHelper.insertOk(this.nitronetDb, query, params);
    return result ? { id, ...dto } : null;
  }

  async deleteSensorCoche(id: number) {
    const query = `DELETE FROM sensores_coche WHERE id = ?`;
    return this.dbHelper.insertOk(this.nitronetDb, query, [id]);
  }

  // -------- LECTURAS --------
  async createLectura(dto: CreateLecturaDto) {
    const query = `
      INSERT INTO lecturas (id_sensor_coche, valor)
      VALUES (?, ?)
    `;
    const params = [dto.id_sensor_coche, dto.valor];
    const result = await this.dbHelper.insert(this.nitronetDb, query, params);
    return { id: result.insertId, ...dto };
  }

  async getLecturasBySensorCoche(id_sensor_coche: number) {
    const query = `
      SELECT * FROM lecturas
      WHERE id_sensor_coche = ?
      ORDER BY created_at DESC
    `;
    return this.dbHelper.select(this.nitronetDb, query, [id_sensor_coche]);
  }
}