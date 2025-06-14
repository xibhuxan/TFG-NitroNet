import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { CarsService } from './cars.service';
import { CreateCocheDto } from './dto/vehiculo/create-coche.dto';
import { UpdateCocheDto } from './dto/vehiculo/update-coche.dto';
import { CreateEscalaDto } from './dto/escala/create-escala.dto';
import { UpdateEscalaDto } from './dto/escala/update-escala.dto';
import { ResponseCocheDto } from './dto/vehiculo/response-coche.dto';
import { ResponseEscalaDto } from './dto/escala/response-escala.dto';

@ApiTags('Cars')
@Controller('cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  // ----- Vehículos ------
  @Post('coches')
  @ApiOperation({ summary: 'Crear un nuevo coche' })
  @ApiBody({ type: CreateCocheDto })
  @ApiResponse({ status: 201, description: 'Coche creado exitosamente.', type: ResponseCocheDto })
  createCoches(@Body() createCocheDto: CreateCocheDto) {
    return this.carsService.createCoches(createCocheDto);
  }

  @Get('coches')
  @ApiOperation({ summary: 'Obtener todos los coches' })
  @ApiResponse({ status: 200, description: 'Lista de coches.', type: [ResponseCocheDto] })
  getAllCoches() {
    return this.carsService.getAllCoches();
  }

  @Get('coches/:id')
  @ApiOperation({ summary: 'Obtener un coche por ID' })
  @ApiParam({ name: 'id', description: 'ID del coche', type: Number })
  @ApiResponse({ status: 200, description: 'Coche encontrado.', type: ResponseCocheDto })
  @ApiResponse({ status: 404, description: 'Coche no encontrado.' })
  getCoche(@Param('id', ParseIntPipe) id: number) {
    return this.carsService.getCocheById(id);
  }

  @Patch('coches/:id')
  @ApiOperation({ summary: 'Actualizar un coche existente' })
  @ApiParam({ name: 'id', description: 'ID del coche a actualizar', type: Number })
  @ApiBody({ type: UpdateCocheDto })
  @ApiResponse({ status: 200, description: 'Coche actualizado.', type: ResponseCocheDto })
  updateCoche(@Param('id', ParseIntPipe) id: number, @Body() updateCocheDto: UpdateCocheDto) {
    return this.carsService.updateCoche(id, updateCocheDto);
  }

  @Delete('coches/:id')
  @ApiOperation({ summary: 'Eliminar un coche' })
  @ApiParam({ name: 'id', description: 'ID del coche a eliminar', type: Number })
  @ApiResponse({ status: 200, description: 'Coche eliminado exitosamente.' })
  deleteCoche(@Param('id', ParseIntPipe) id: number) {
    return this.carsService.deleteCoche(id);
  }

  // ----- Escalas -----
  @Post('escalas')
  @ApiOperation({ summary: 'Crear una nueva escala' })
  @ApiBody({ type: CreateEscalaDto })
  @ApiResponse({ status: 201, description: 'Escala creada exitosamente.', type: ResponseEscalaDto })
  createEscala(@Body() createEscalaDto: CreateEscalaDto) {
    return this.carsService.createEscala(createEscalaDto);
  }

  @Get('escalas')
  @ApiOperation({ summary: 'Obtener todas las escalas' })
  @ApiResponse({ status: 200, description: 'Lista de escalas.', type: [ResponseEscalaDto] })
  getAllEscalas() {
    return this.carsService.getAllEscalas();
  }

  @Get('escalas/:id')
  @ApiOperation({ summary: 'Obtener una escala por ID' })
  @ApiParam({ name: 'id', description: 'ID de la escala', type: Number })
  @ApiResponse({ status: 200, description: 'Escala encontrada.', type: ResponseEscalaDto })
  @ApiResponse({ status: 404, description: 'Escala no encontrada.' })
  getEscala(@Param('id', ParseIntPipe) id: number) {
    return this.carsService.getEscalaById(id);
  }

  @Patch('escalas/:id')
  @ApiOperation({ summary: 'Actualizar una escala existente' })
  @ApiParam({ name: 'id', description: 'ID de la escala a actualizar', type: Number })
  @ApiBody({ type: UpdateEscalaDto })
  @ApiResponse({ status: 200, description: 'Escala actualizada.', type: ResponseEscalaDto })
  updateEscala(@Param('id', ParseIntPipe) id: number, @Body() updateEscalaDto: UpdateEscalaDto) {
    return this.carsService.updateEscala(id, updateEscalaDto);
  }

  @Delete('escalas/:id')
  @ApiOperation({ summary: 'Eliminar una escala' })
  @ApiParam({ name: 'id', description: 'ID de la escala a eliminar', type: Number })
  @ApiResponse({ status: 200, description: 'Escala eliminada exitosamente.' })
  deleteEscala(@Param('id', ParseIntPipe) id: number) {
    return this.carsService.deleteEscala(id);
  }
}
