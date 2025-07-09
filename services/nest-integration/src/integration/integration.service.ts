import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InvoiceService } from '../invoice/invoice.service';
import { QueryService } from '../query/query.service';
import { SalesLeadService } from 'src/sales-lead/sales-lead.service';
import { CreateSalesLeadDto } from 'src/sales-lead/dto/create-sales-lead.dto';

@Injectable()
export class IntegrationService {
  private readonly webhookSecret: string;

  constructor(
    private readonly invoiceService: InvoiceService,
    private readonly queryService: QueryService,
    private readonly salesLeadService: SalesLeadService,
    private readonly configService: ConfigService,
  ) {
    this.webhookSecret = this.configService.get<string>('WEBHOOK_SECRET')!;
  }

  async getSummary() {
    const [invoiceStats, queryStats] = await Promise.all([
      this.invoiceService.getStatusSummary(),
      this.queryService.getStatusSummary(),
    ]);

    return {
      invoice: invoiceStats,
      query: queryStats,
    };
  }

  validateApiKey(apiKey: string): boolean {
    return apiKey === this.webhookSecret;
  }

  async processWebhook(payload: CreateSalesLeadDto) {
    // Forward the payload to SalesLeadService
    return this.salesLeadService.createLead(payload);
  }
}
