import { Test, TestingModule } from '@nestjs/testing';
import { UnitsController } from './units.controller';
import { UnitsService } from './units.service';

describe('UnitsController', () => {
  let unitsController: UnitsController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [UnitsController],
      providers: [UnitsService],
    }).compile();

    unitsController = app.get<UnitsController>(UnitsController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(unitsController.getHello()).toBe('Hello World!');
    });
  });
});
