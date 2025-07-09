import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { CreateSalesLeadDto } from './dto/create-sales-lead.dto';
import { SalesLead } from './schemas/sales-lead.schema';

@Injectable()
export class SalesLeadRepository {
  constructor(
    @InjectModel(SalesLead.name) private readonly model: Model<SalesLead>,
  ) {}

  async create(dto: CreateSalesLeadDto): Promise<SalesLead> {
    return this.model.create(dto);
  }

  async findAll(): Promise<SalesLead[]> {
    return this.model.find().exec();
  }
}
