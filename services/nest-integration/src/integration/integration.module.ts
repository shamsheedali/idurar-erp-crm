import { Module } from '@nestjs/common';
import { IntegrationController } from './integration.controller';
import { IntegrationService } from './integration.service';
import { InvoiceModule } from '../invoice/invoice.module';
import { QueryModule } from '../query/query.module';
import { SalesLeadModule } from 'src/sales-lead/sales-lead.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [IntegrationController],
  providers: [IntegrationService],
  imports: [InvoiceModule, QueryModule, SalesLeadModule, ConfigModule],
})
export class IntegrationModule {}
