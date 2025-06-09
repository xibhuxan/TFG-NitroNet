import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { CarsRepository } from './cars.repository';
import { CreateCocheDto } from './dto/vehiculo/create-coche.dto';
import { UpdateCocheDto } from './dto/vehiculo/update-coche.dto';
import { CreateEscalaDto } from './dto/escala/create-escala.dto';
import { UpdateEscalaDto } from './dto/escala/update-escala.dto';

@Injectable()
export class CarsService {
  constructor(private readonly carsRepository: CarsRepository) {}

  // ------- COCHES -------

  async createCoches(dto: CreateCocheDto) {
    // Comprobar si ya existe un coche con el mismo nombre
    const existing = await this.carsRepository.getCocheByNombre(dto.nombre);
    if (existing) {
      throw new BadRequestException('Ya existe un coche con ese nombre');
    }
    return this.carsRepository.createCoche(dto);
  }

  async getAllCoches() {
    return this.carsRepository.getAllCoches();
  }

  async getCocheById(id: number) {
    const coche = await this.carsRepository.getCocheById(id);
    if (!coche) throw new NotFoundException('Coche no encontrado');
    return coche;
  }

  async updateCoche(id: number, dto: UpdateCocheDto) {
    // Si se actualiza el nombre, comprobar duplicados
    if (dto.nombre) {
      const existing = await this.carsRepository.getCocheByNombre(dto.nombre);
      if (existing && existing.id !== id) {
        throw new BadRequestException('Ya existe un coche con ese nombre');
      }
    }
    const updated = await this.carsRepository.updateCoche(id, dto);
    if (!updated) throw new NotFoundException('Coche no encontrado');
    return updated;
  }

  async deleteCoche(id: number) {
    const deleted = await this.carsRepository.deleteCoche(id);
    if (!deleted) throw new NotFoundException('Coche no encontrado');
    return { message: 'Coche eliminado' };
  }

  // ------- ESCALAS -------

  async createEscala(dto: CreateEscalaDto) {
    // Comprobar si ya existe una escala con el mismo valor
    const existing = await this.carsRepository.getEscalaByValor(dto.valor);
    if (existing) {
      throw new BadRequestException('Ya existe una escala con ese valor');
    }
    return this.carsRepository.createEscala(dto);
  }

  async getAllEscalas() {
    return this.carsRepository.getAllEscalas();
  }

  async getEscalaById(id: number) {
    const escala = await this.carsRepository.getEscalaById(id);
    if (!escala) throw new NotFoundException('Escala no encontrada');
    return escala;
  }

  async updateEscala(id: number, dto: UpdateEscalaDto) {
    // Si se actualiza el valor, comprobar duplicados
    if (dto.valor) {
      const existing = await this.carsRepository.getEscalaByValor(dto.valor);
      if (existing && existing.id !== id) {
        throw new BadRequestException('Ya existe una escala con ese valor');
      }
    }
    const updated = await this.carsRepository.updateEscala(id, dto);
    if (!updated) throw new NotFoundException('Escala no encontrada');
    return updated;
  }

  async deleteEscala(id: number) {
    const deleted = await this.carsRepository.deleteEscala(id);
    if (!deleted) throw new NotFoundException('Escala no encontrada');
    return { message: 'Escala eliminada' };
  }
}
