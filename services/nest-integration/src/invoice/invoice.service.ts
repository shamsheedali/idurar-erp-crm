import { Injectable } from '@nestjs/common';
import { InvoiceRepository } from './invoice.repository';

@Injectable()
export class InvoiceService {
  constructor(private readonly invoiceRepository: InvoiceRepository) {}

  getStatusSummary() {
    return this.invoiceRepository.countByStatus();
  }

  getMonthlyTotals() {
    return this.invoiceRepository.totalAmountByMonth();
  }
}
