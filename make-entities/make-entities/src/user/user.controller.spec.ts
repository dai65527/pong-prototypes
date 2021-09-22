import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken, TypeOrmModule } from "@nestjs/typeorm";
import { Photo } from "src/entities/photo.entity";
import { User } from "src/entities/user.entity";
import { Connection, createConnection, getConnection } from "typeorm";
import { UsersController } from "./user.controller";
import { UsersService } from "./user.service";

describe("UsersController", () => {
  let controller: UsersController;
  let module: TestingModule;

  beforeEach(async () => {
    const users = [
      {
        id: 1,
        firstName: "hirokazu",
        lastName: "kamiya",
        isActive: true,
        photos: [
          {
            id: 1,
            url: "a",
          },
          {
            id: 2,
            url: "b",
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

    const connection = await createConnection({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "postgres",
      password: "postgres",
      database: "pong",
      entities: [User, Photo],
      logging: true,
      synchronize: false,
    });

    module = await Test.createTestingModule({
      controllers: [UsersController],
      // providers: [UsersService, MockRepository],
      providers: [UsersService],
    }).compile();
  });

  afterEach(async () => {
    await getConnection().close();
  });

  describe("/users", () => {
    it("should return all users", async () => {
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
