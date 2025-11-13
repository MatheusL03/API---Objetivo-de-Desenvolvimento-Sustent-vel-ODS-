import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { DescarteService } from './descarte.service';
import { Descarte } from './descarte.model';
import { CreateDescarteDto } from './dto/create-descarte.dto';

@Controller('descarte')
export class DescarteController {
  constructor(private readonly descarteService: DescarteService) {}

  @Get()
  async listarTodos(): Promise<Descarte[]> {
    return this.descarteService.findAll();
  }

  @Post()
  async criar(@Body() data: CreateDescarteDto): Promise<Descarte> {
    console.log('Recebido:', data);
    return this.descarteService.create(data);
  }

  @Put(':id')
  async atualizar(
    @Param('id') id: string,
    @Body() data: CreateDescarteDto,
  ): Promise<Descarte | null> {
    return this.descarteService.update(id, data);
  }

  @Delete(':id')
  async remover(@Param('id') id: string): Promise<Descarte | null> {
    return this.descarteService.delete(id);
  }
}
