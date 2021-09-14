import { Test, TestingModule } from '@nestjs/testing';
import { User } from 'src/entities/user.entity';
import { UsersService } from './users.service';
import { TypeOrmTestModule } from '@devniel/nestjs-typeorm-testing';
import { Photo } from 'src/entities/photo.entity';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import {
  Connection,
  createConnection,
  getConnection,
  getConnectionOptions,
  getRepository,
  Repository,
} from 'typeorm';
import { AppModule } from 'src/app.module';

describe('UsersService', () => {
  let service: UsersService;
  // let repository: Repository<User>;
  const testConnectionName = 'testConnection';
  let connection: Connection;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      // imports: [TypeOrmModule.forRoot(), TypeOrmModule.forFeature([User])],
      imports: [TypeOrmTestModule.forTest([User, Photo])],
      // imports: [
      //   TypeOrmModule.forRoot(),
      //   TypeOrmModule.forFeature([User]),
      //   TypeOrmTestModule.forTest([User, Photo]),
      // ],
      providers: [
        UsersService,
        // {
        //   provide: getRepositoryToken(User),
        //   useClass: Repository,
        // },
      ],
    }).compile();

    const connectionOptions = await getConnectionOptions();
    Object.assign(connectionOptions, { entities: [User, Photo] });
    connection = await createConnection(connectionOptions);
    // repository = getRepository(User, testConnectionName);
    service = module.get<UsersService>(UsersService);
    // return connection;
  });

  afterEach(async () => {
    await getConnection().close();
  });

  it('should be defined', async () => {
    // const actual = await service.findAll();
    // console.log(actual);
    // expect(actual.length).toBe(1);
    // const actual = await service.findAll();
    // console.log(actual);
    expect(service).toBeDefined();
    // expect(await service.getAllItems()).toHaveLength(1);
    connection.getRepository(User);
    expect(await service.findAll()).toHaveLength(1);
  });
});
