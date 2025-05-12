import { Injectable } from "@nestjs/common";
import { InjectDataSource } from "@nestjs/typeorm";
import { DataSource } from "typeorm";

@Injectable()
export class CarRepository {
    constructor(
        @InjectDataSource('nitronet_db') private readonly nitronet_db: DataSource,
    ){}
    
    async getAllSensors(){
        
    }
}