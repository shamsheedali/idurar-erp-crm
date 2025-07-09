import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Invoice } from './schemas/invoice.schema';
import { Model } from 'mongoose';

@Injectable()
export class InvoiceRepository {
  constructor(
    @InjectModel(Invoice.name)
    private readonly invoiceModel: Model<Invoice>,
  ) {}

  async countByStatus(): Promise<Record<string, number>> {
    const result: { _id: string; count: number }[] =
      await this.invoiceModel.aggregate([
        {
          $group: {
            _id: '$status',
            count: { $sum: 1 },
          },
        },
      ]);

    const summary: Record<string, number> = {};
    result.forEach((item) => {
      summary[item._id] = item.count;
    });

    return summary;
  }

  async totalAmountByMonth(): Promise<{ month: string; total: number }[]> {
    return this.invoiceModel.aggregate([
      {
        $group: {
          _id: { $month: '$date' },
          total: { $sum: '$total' },
        },
      },
      {
        $project: {
          month: '$_id',
          total: 1,
          _id: 0,
        },
      },
      {
        $sort: { month: 1 },
      },
    ]);
  }
}
