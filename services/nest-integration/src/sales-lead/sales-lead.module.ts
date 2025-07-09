import { Module } from '@nestjs/common';
import { SalesLeadService } from './sales-lead.service';
import { SalesLeadRepository } from './sales-lead.repository';
import { SalesLead, SalesLeadSchema } from './schemas/sales-lead.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: SalesLead.name, schema: SalesLeadSchema },
    ]),
  ],
  controllers: [],
  providers: [SalesLeadService, SalesLeadRepository],
  exports: [SalesLeadService],
})
export class SalesLeadModule {}
