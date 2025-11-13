import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Descarte, DescarteDocument } from './descarte.model';
import { CreateDescarteDto } from './dto/create-descarte.dto';

@Injectable()
export class DescarteService {
  constructor(
    @InjectModel(Descarte.name) private descarteModel: Model<DescarteDocument>,
  ) {}

  async findAll(): Promise<Descarte[]> {
    return this.descarteModel.find().exec();
  }

  async create(data: CreateDescarteDto): Promise<Descarte> {
    const novo = new this.descarteModel(data);
    return novo.save();
  }

  async update(id: string, data: CreateDescarteDto): Promise<Descarte | null> {
    return this.descarteModel.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id: string): Promise<Descarte | null> {
    return this.descarteModel.findByIdAndDelete(id);
  }
}
