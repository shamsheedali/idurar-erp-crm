import { Test, TestingModule } from '@nestjs/testing';
import { IntegrationController } from './integration.controller';
import { IntegrationService } from './integration.service';
import { UnauthorizedException } from '@nestjs/common';
import { CreateSalesLeadDto } from 'src/sales-lead/dto/create-sales-lead.dto';

describe('IntegrationController', () => {
  let controller: IntegrationController;
  let service: IntegrationService;

  const mockIntegrationService = {
    getSummary: jest.fn(),
    validateApiKey: jest.fn(),
    processWebhook: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IntegrationController],
      providers: [
        {
          provide: IntegrationService,
          useValue: mockIntegrationService,
        },
      ],
    }).compile();

    controller = module.get<IntegrationController>(IntegrationController);
    service = module.get<IntegrationService>(IntegrationService);

    jest.clearAllMocks(); // Clear mocks before each test
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getSummary', () => {
    it('should return summary data from the service', async () => {
      const summaryMock = {
        invoice: { total: 5 },
        query: { total: 3 },
      };

      mockIntegrationService.getSummary.mockResolvedValue(summaryMock);

      const result = await controller.getSummary();
      expect(result).toEqual(summaryMock);
      expect(mockIntegrationService.getSummary).toHaveBeenCalled();
    });
  });

  describe('handleWebhook', () => {
    const validApiKey = 'secret-api-key';
    const payload: CreateSalesLeadDto = {
      leadName: 'Test Lead',
      email: 'test@example.com',
      message: 'Hello',
    };

    it('should throw UnauthorizedException for invalid API key', async () => {
      mockIntegrationService.validateApiKey.mockReturnValue(false);

      await expect(
        controller.handleWebhook('invalid-key', payload),
      ).rejects.toThrow(UnauthorizedException);

      expect(mockIntegrationService.validateApiKey).toHaveBeenCalledWith(
        'invalid-key',
      );
    });

    it('should process webhook and return success for valid API key', async () => {
      mockIntegrationService.validateApiKey.mockReturnValue(true);
      mockIntegrationService.processWebhook.mockResolvedValue(undefined); // no return value expected

      const result = await controller.handleWebhook(validApiKey, payload);

      expect(result).toEqual({
        success: true,
        message: 'Webhook processed successfully',
      });

      expect(mockIntegrationService.validateApiKey).toHaveBeenCalledWith(
        validApiKey,
      );
      expect(mockIntegrationService.processWebhook).toHaveBeenCalledWith(
        payload,
      );
    });
  });
});
