import { Inject, Injectable } from '@nestjs/common';
import { MariaDbHelperService } from 'src/database/mariadb-helper.service';
import { CreateCocheDto } from './dto/vehiculo/create-coche.dto';
import { Pool } from 'mariadb';
import { UpdateCocheDto } from './dto/vehiculo/update-coche.dto';
import { CreateEscalaDto } from './dto/escala/create-escala.dto';
import { UpdateEscalaDto } from './dto/escala/update-escala.dto';

@Injectable()
export class CarsRepository {
    constructor(
        @Inject('NITRONET_DB') private readonly nitronetDb: Pool,
        private readonly dbHelper: MariaDbHelperService,
    ) { }

    // ----- COCHES -----

    async createCoche(dto: CreateCocheDto) {
        const query = `
      INSERT INTO coches (nombre, modelo, cc, id_escala)
      VALUES (?, ?, ?, ?)
    `;
        const params = [
            dto.nombre,
            dto.modelo || null,
            dto.cc || null,
            dto.id_escala || null
        ];
        const result = await this.dbHelper.insert(this.nitronetDb, query, params);
        return { id: result.insertId };
    }

    async getAllCoches() {
        const query = `
      SELECT c.*, e.valor AS escala_valor, e.descripcion AS escala_descripcion
      FROM coches c
      LEFT JOIN escalas e ON c.id_escala = e.id
    `;
        return this.dbHelper.select(this.nitronetDb, query);
    }

    async getCocheById(id: number) {
        const query = `
      SELECT c.*, e.valor AS escala_valor, e.descripcion AS escala_descripcion
      FROM coches c
      LEFT JOIN escalas e ON c.id_escala = e.id
      WHERE c.id = ?
    `;
        const result = await this.dbHelper.selectOne(this.nitronetDb, query, [id]);
        return result;
    }

    async getCocheByNombre(nombre: string) {
        const query = `SELECT * FROM coches WHERE nombre = ?`;
        const result = await this.dbHelper.selectOne(this.nitronetDb, query, [nombre]);
        return result;
    }

    async updateCoche(id: number, dto: UpdateCocheDto) {
        const fields: string[] = [];
        const params: any[] = [];
        Object.entries(dto).forEach(([key, value]) => {
            fields.push(`${key} = ?`);
            params.push(value);
        });
        if (fields.length === 0) return false;
        const query = `UPDATE coches SET ${fields.join(', ')} WHERE id = ?`;
        params.push(id);
        const result = await this.dbHelper.updateOk(this.nitronetDb, query, params);
        return result;
    }

    async deleteCoche(id: number) {
        const query = `DELETE FROM coches WHERE id = ?`;
        const result = await this.dbHelper.deleteOk(this.nitronetDb, query, [id]);
        return result;
    }

    // ----- ESCALAS -----

    async createEscala(dto: CreateEscalaDto) {
        const query = `INSERT INTO escalas (valor, descripcion) VALUES (?, ?)`;
        const params = [dto.valor, dto.descripcion || null];
        const result = await this.dbHelper.insert(this.nitronetDb, query, params);
        return { id: result.insertId };
    }

    async getAllEscalas() {
        const query = `SELECT * FROM escalas`;
        return this.dbHelper.select(this.nitronetDb, query);
    }

    async getEscalaById(id: number) {
        const query = `SELECT * FROM escalas WHERE id = ?`;
        const result = await this.dbHelper.selectOne(this.nitronetDb, query, [id]);
        return result;
    }

    async getEscalaByValor(valor: string) {
        const query = `SELECT * FROM escalas WHERE valor = ?`;
        const result = await this.dbHelper.selectOne(this.nitronetDb, query, [valor]);
        return result;
    }

    async updateEscala(id: number, dto: UpdateEscalaDto) {
        const fields: string[] = [];
        const params: any[] = [];
        Object.entries(dto).forEach(([key, value]) => {
            fields.push(`${key} = ?`);
            params.push(value);
        });
        if (fields.length === 0) return false;
        const query = `UPDATE escalas SET ${fields.join(', ')} WHERE id = ?`;
        params.push(id);
        const result = await this.dbHelper.update(this.nitronetDb, query, params);
        return result.affectedRows > 0;
    }

    async deleteEscala(id: number) {
        const query = `DELETE FROM escalas WHERE id = ?`;
        const result = await this.dbHelper.delete(this.nitronetDb, query, [id]);
        return result.affectedRows > 0;
    }
}
