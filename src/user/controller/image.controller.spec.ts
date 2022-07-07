import { Test, TestingModule } from '@nestjs/testing';
import { User\controller\imageController } from './user\controller\image.controller';

describe('User\controller\imageController', () => {
  let controller: User\controller\imageController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [User\controller\imageController],
    }).compile();

    controller = module.get<User\controller\imageController>(User\controller\imageController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
