import { Test, TestingModule } from '@nestjs/testing';
import { SalesLeadService } from './sales-lead.service';
import { SalesLeadRepository } from './sales-lead.repository';

describe('SalesLeadService', () => {
  let service: SalesLeadService;

  const mockSalesLeadRepository = {
    create: jest
      .fn()
      .mockImplementation((dto) => Promise.resolve({ _id: 'mockId', ...dto })),
    findAll: jest.fn().mockResolvedValue([]),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SalesLeadService,
        {
          provide: SalesLeadRepository,
          useValue: mockSalesLeadRepository,
        },
      ],
    }).compile();

    service = module.get<SalesLeadService>(SalesLeadService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a lead', async () => {
    const dto = { name: 'John Doe', email: 'john@example.com' }; // adjust this to match your actual DTO
    const result = await service.createLead(dto as any);
    expect(result).toEqual({ _id: 'mockId', ...dto });
    expect(mockSalesLeadRepository.create).toHaveBeenCalledWith(dto);
  });
});
