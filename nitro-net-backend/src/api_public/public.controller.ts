import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PublicService } from './public.service';

@Controller('public')
export class PublicController {
  constructor(private readonly publicService: PublicService) {}

}
