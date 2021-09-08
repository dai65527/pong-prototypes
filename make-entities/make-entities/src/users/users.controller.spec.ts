import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;
  let module: TestingModule;

  beforeEach(async () => {
    const users = [
      {
        id: 1,
        firstName: 'hirokazu',
        lastName: 'kamiya',
        isActive: true,
        photos: [
          {
            id: 1,
            url: 'a',
          },
          {
            id: 2,
            url: 'b',
          },
        ],
      },
    ];

    const MockRepository = {
      provide: getRepositoryToken(User),
      useValue: {
        find: () => users,
      },
    };

    module = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService, MockRepository],
    }).compile();
  });

  describe('/users', () => {
    it('should return all users', async () => {
      const controller = module.get<UsersController>(UsersController);
      const actual = await controller.getUsers();
      expect(actual).toHaveLength(1);
    });
  });

  // beforeEach(async () => {
  //   const module: TestingModule = await Test.createTestingModule({
  //     imports: [TypeOrmModule.forRoot(), TypeOrmModule.forFeature([User])],
  //     controllers: [UsersController],
  //     providers: [UsersService],
  //   }).compile();

  //   controller = module.get<UsersController>(UsersController);
  // });

  // // it('should be defined', () => {
  // //   expect(controller).toBeDefined();
  // // });
  // describe('/users', () => {
  //   it('should return all users', () => {
  //     expect(controller.getUsers()).toHaveLength(1);
  //   });
  // });
});
