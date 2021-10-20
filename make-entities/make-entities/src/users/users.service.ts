import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Photo } from "src/entities/photo.entity";
import { User } from "src/entities/user.entity";
import { getConnection, getManager, Repository } from "typeorm";

const items = [
  {
    id: 1,
    title: "Item title",
    body: "Hello, World",
    deletePassword: "1234",
  },
];

@Injectable()
export class UsersService {
  // constructor(
  //   @InjectRepository(User) private userRepository: Repository<User>,
  // ) {}

  // async findAll(): Promise<User[]> {
  //   return await this.userRepository.find();
  // }

  async find(): Promise<User[]> {
    return await getManager().find(User, { relations: ["photos"] });
  }

  async findOne(): Promise<User> {
    return await getManager().findOne(User, 3);
  }

  async findOneOrFail(): Promise<User> {
    return await getManager().findOneOrFail(User, 3);
  }

  async findAll(): Promise<User[]> {
    return await getConnection()
      .getRepository(User)
      .find({ relations: ["photos"] });
  }

  async getAllItems(): Promise<any> {
    return await [...items];
  }
}
