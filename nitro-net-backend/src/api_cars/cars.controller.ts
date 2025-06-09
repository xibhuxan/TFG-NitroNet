import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { CarsService } from './cars.service';
import { CreateCocheDto } from './dto/vehiculo/create-coche.dto';
import { UpdateCocheDto } from './dto/vehiculo/update-coche.dto';
import { CreateEscalaDto } from './dto/escala/create-escala.dto';
import { UpdateEscalaDto } from './dto/escala/update-escala.dto';

@Controller('cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

    // ----- Vehículos ------
    @Post('coches')
    createCoches(@Body() createCocheDto: CreateCocheDto) {
      return this.carsService.createCoches(createCocheDto);
    }
  
    @Get('coches')
    getAllCoches() {
      return this.carsService.getAllCoches();
    }
  
    @Get('coches/:id')
    getCoche(@Param('id', ParseIntPipe) id: number) {
      return this.carsService.getCocheById(id);
    }
  
    @Patch('coches/:id')
    updateCoche(@Param('id', ParseIntPipe) id: number, @Body() updateCocheDto: UpdateCocheDto) {
      return this.carsService.updateCoche(id, updateCocheDto);
    }

    @Delete('coches/:id')
    deleteCoche(@Param('id', ParseIntPipe) id: number) {
      return this.carsService.deleteCoche(id);
    }


    // ----- Escalas -----
    @Post('escalas')
    createEscala(@Body() createEscalaDto: CreateEscalaDto) {
      return this.carsService.createEscala(createEscalaDto);
    }
  
    @Get('escalas')
    getAllEscalas() {
      return this.carsService.getAllEscalas();
    }
  
    @Get('escalas/:id')
    getEscala(@Param('id', ParseIntPipe) id: number) {
      return this.carsService.getEscalaById(id);
    }
  
    @Patch('escalas/:id')
    updateEscala(@Param('id', ParseIntPipe) id: number, @Body() updateEscalaDto: UpdateEscalaDto) {
      return this.carsService.updateEscala(id, updateEscalaDto);
    }
  
    @Delete('escalas/:id')
    deleteEscala(@Param('id', ParseIntPipe) id: number) {
      return this.carsService.deleteEscala(id);
    }

}
