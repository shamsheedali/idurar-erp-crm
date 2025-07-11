import { Test, TestingModule } from '@nestjs/testing';
import { SalesLeadController } from './sales-lead.controller';
import { SalesLeadService } from './sales-lead.service';

describe('SalesLeadController', () => {
  let controller: SalesLeadController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SalesLeadController],
      providers: [SalesLeadService],
    }).compile();

    controller = module.get<SalesLeadController>(SalesLeadController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
