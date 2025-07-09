import {
  Body,
  Controller,
  Get,
  Headers,
  HttpCode,
  HttpStatus,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { IntegrationService } from './integration.service';
import { CreateSalesLeadDto } from 'src/sales-lead/dto/create-sales-lead.dto';

@Controller('integration')
export class IntegrationController {
  constructor(private readonly integrationService: IntegrationService) {}

  @Get('reports/summary')
  async getSummary() {
    return this.integrationService.getSummary();
  }

  @Post('webhook')
  @HttpCode(HttpStatus.OK)
  async handleWebhook(
    @Headers('x-api-key') apiKey: string,
    @Body() payload: CreateSalesLeadDto,
  ) {
    if (!this.integrationService.validateApiKey(apiKey)) {
      throw new UnauthorizedException('Invalid API key');
    }

    await this.integrationService.processWebhook(payload);

    return {
      success: true,
      message: 'Webhook processed successfully',
    };
  }
}
