import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Query } from './schemas/query.schema';

@Injectable()
export class QueryRepository {
  constructor(@InjectModel(Query.name) private queryModel: Model<Query>) {}

  async countByStatus(): Promise<Record<string, number>> {
    const result: { _id: string; count: number }[] =
      await this.queryModel.aggregate([
        {
          $group: {
            _id: '$status',
            count: { $sum: 1 },
          },
        },
      ]);

    const summary: Record<string, number> = {};
    for (const item of result) {
      summary[item._id] = item.count;
    }

    return summary;
  }

  async countTotal(): Promise<number> {
    return this.queryModel.countDocuments();
  }
}
