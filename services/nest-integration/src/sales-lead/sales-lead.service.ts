import { Injectable } from '@nestjs/common';
import { SalesLeadRepository } from './sales-lead.repository';
import { CreateSalesLeadDto } from './dto/create-sales-lead.dto';

@Injectable()
export class SalesLeadService {
  constructor(private readonly salesLeadRepo: SalesLeadRepository) {}

  async createLead(payload: CreateSalesLeadDto) {
    return this.salesLeadRepo.create(payload);
  }
}
