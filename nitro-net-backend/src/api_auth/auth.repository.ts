import { Inject, Injectable } from "@nestjs/common";
import { Pool } from "mariadb";
import { MariaDbHelperService } from "src/database/mariadb-helper.service";
import { ResponseUsuarioDto } from "./dto/usuario/response-usuario.dto";
import { CreateUsuarioDto } from "./dto/usuario/create-usuario.dto";
import { UpdateUsuarioDto } from "./dto/usuario/update-usuario.dto";
import { CreateRolDto } from "./dto/roles/create-rol.dto";
import { UpdateRolDto } from "./dto/roles/update-rol.dto";

@Injectable()
export class AuthRepository {
  constructor(
    @Inject('NITRONET_DB') private readonly nitronetDb: Pool,
    private readonly dbHelper: MariaDbHelperService,
  ) { }

   async getUserCarAndSensors(userId: number) {
    const query = `
      SELECT 
        u.id AS usuario_id,
        c.id AS coche_id,
        c.nombre,
        c.modelo,
        c.cc,
        e.valor AS escala,
        sc.id AS id_sensor_coche,
        s.tipo,
        s.nombre AS sensor_nombre,
        s.unidad,
        sc.ubicacion
      FROM usuarios u
      JOIN coches c ON u.id_coche = c.id
      LEFT JOIN escalas e ON c.id_escala = e.id
      JOIN sensores_coche sc ON sc.id_coche = c.id
      JOIN sensores s ON s.id = sc.id_sensor
      WHERE u.id = ?
    `;
    const result = await this.dbHelper.select(this.nitronetDb, query, [userId]);
    return result;
  }

  // ---------- USUARIOS ----------
  async createUser(usuario: CreateUsuarioDto) {
    const query = `
    INSERT INTO usuarios (username, password_hash, nombre_uno, nombre_dos, apellido_uno, apellido_dos, id_coche)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;
    const params = [
      usuario.username,
      usuario.password,
      usuario.nombre_uno,
      usuario.nombre_dos || null,
      usuario.apellido_uno || null,
      usuario.apellido_dos || null,
      usuario.id_coche || null,
    ];
    const result = await this.dbHelper.insert(this.nitronetDb, query, params);
    return { id: result.insertId };
  }

  async getAllUsers(): Promise<ResponseUsuarioDto[] | null> {
    const query = `SELECT * FROM usuarios`;
    return this.dbHelper.select(this.nitronetDb, query);
  }

  async getUserByUsername(username: string) {
    const query = `SELECT * FROM usuarios WHERE username = ?`;
    const result = await this.dbHelper.selectOne(this.nitronetDb, query, [username]);
    return result;
  }

  async getUserById(id: number) {
    const query = `SELECT * FROM usuarios WHERE id = ?`;
    const result = await this.dbHelper.selectOne(this.nitronetDb, query, [id]);
    return result;
  }

  async updateUser(id: number, dto: UpdateUsuarioDto) {
    const fields: string[] = [];
    const params: any[] = [];
    for (const key in dto) {
      if (dto[key] !== undefined) {
        fields.push(`${key} = ?`);
        params.push(dto[key]);
      }
    }
    if (fields.length === 0) return null;
    const query = `UPDATE usuarios SET ${fields.join(', ')} WHERE id = ?`;
    params.push(id);
    const result = await this.dbHelper.updateOk(this.nitronetDb, query, params);
    return result;
  }

  async deleteUser(id: number) {
    const query = `DELETE FROM usuarios WHERE id = ?`;
    const result = await this.dbHelper.deleteOk(this.nitronetDb, query, [id]);
    return result;
  }

  // ---------- ROLES ----------
  async createRole(dto: CreateRolDto) {
    const query = `INSERT INTO roles (tipo) VALUES (?)`;
    const result = await this.dbHelper.insert(this.nitronetDb, query, [dto.tipo]);
    return { id: result.insertId };
  }

  async getAllRoles() {
    const query = `SELECT * FROM roles`;
    return this.dbHelper.query(this.nitronetDb, query);
  }

  async getRolById(id: number) {
    const query = `SELECT * FROM roles WHERE id = ?`;
    const result = await this.dbHelper.query(this.nitronetDb, query, [id]);
    if (!result) return null;
    return result[0] || null;
  }

  async updateRole(id: number, dto: UpdateRolDto) {
    const fields: string[] = [];
    const params: any[] = [];
    for (const key in dto) {
      if (dto[key] !== undefined) {
        fields.push(`${key} = ?`);
        params.push(dto[key]);
      }
    }
    if (fields.length === 0) return null;
    const query = `UPDATE roles SET ${fields.join(', ')} WHERE id = ?`;
    params.push(id);
    const result = await this.dbHelper.insertOk(this.nitronetDb, query, params);
    return result ? { id, ...dto } : null;
  }

  async deleteRole(id: number) {
    const query = `DELETE FROM roles WHERE id = ?`;
    const result = await this.dbHelper.insertOk(this.nitronetDb, query, [id]);
    return result;
  }

  // ---------- ASIGNACIÓN DE ROLES A USUARIOS ----------
  async assignRoleToUser(userId: number, roleId: number) {
    // Verifica si ya existe
    const existsQuery = `SELECT 1 FROM usuarios_roles WHERE id_usuario = ? AND id_rol = ? LIMIT 1`;
    const exists = await this.dbHelper.query(this.nitronetDb, existsQuery, [userId, roleId]) || [];
    if (exists.length > 0) return 'exists';
    const query = `INSERT INTO usuarios_roles (id_usuario, id_rol) VALUES (?, ?)`;
    await this.dbHelper.insertOk(this.nitronetDb, query, [userId, roleId]);
    return true;
  }

  async getUserRoles(userId: number) {
    const query = `
      SELECT r.* FROM roles r
      INNER JOIN usuarios_roles ur ON ur.id_rol = r.id
      WHERE ur.id_usuario = ?
    `;
    return this.dbHelper.query(this.nitronetDb, query, [userId]);
  }

  async removeRoleFromUser(userId: number, roleId: number) {
    const query = `DELETE FROM usuarios_roles WHERE id_usuario = ? AND id_rol = ?`;
    const result = await this.dbHelper.insertOk(this.nitronetDb, query, [userId, roleId]);
    return result;
  }

  async getAllSensors() {
    const query = `SELECT * FROM sensors`;
    const result = await this.dbHelper.query(this.nitronetDb, query);
    return result;
  }

}