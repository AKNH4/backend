import { Test, TestingModule } from '@nestjs/testing';
import { User\service\imageService } from './user\service\image.service';

describe('User\service\imageService', () => {
  let service: User\service\imageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [User\service\imageService],
    }).compile();

    service = module.get<User\service\imageService>(User\service\imageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
