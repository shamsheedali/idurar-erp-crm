import { Injectable } from '@nestjs/common';
import { QueryRepository } from './query.repository';

@Injectable()
export class QueryService {
  constructor(private readonly queryRepo: QueryRepository) {}

  async getStatusSummary() {
    return this.queryRepo.countByStatus();
  }

  async getTotalQueries() {
    return this.queryRepo.countTotal();
  }
}
