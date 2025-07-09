import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Query, QuerySchema } from './schemas/query.schema';
import { QueryService } from './query.service';
import { QueryRepository } from './query.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Query.name, schema: QuerySchema }]),
  ],
  providers: [QueryService, QueryRepository],
  exports: [QueryService],
})
export class QueryModule {}
