import { Test, TestingModule } from '@nestjs/testing';
import { CompaniesController } from './companies.controller';
import { CompaniesService } from './companies.service';

describe('CompaniesController', () => {
  let companiesController: CompaniesController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [CompaniesController],
      providers: [CompaniesService],
    }).compile();

    companiesController = app.get<CompaniesController>(CompaniesController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(companiesController.getHello()).toBe('Hello World!');
    });
  });
});
