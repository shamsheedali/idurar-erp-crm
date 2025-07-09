import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { validationSchema } from './config/env.validation';
import { IntegrationModule } from './integration/integration.module';
import { InvoiceModule } from './invoice/invoice.module';
import { QueryModule } from './query/query.module';
import mongoose from 'mongoose';
import { applyMongoosePlugins } from './mongoose/plugins';
import { SalesLeadModule } from './sales-lead/sales-lead.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URI'),
        connectionFactory: (connection: mongoose.Connection) => {
          applyMongoosePlugins(connection);
          return connection;
        },
      }),
      inject: [ConfigService],
    }),
    IntegrationModule,
    InvoiceModule,
    QueryModule,
    SalesLeadModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
