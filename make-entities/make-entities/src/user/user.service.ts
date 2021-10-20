import { Injectable } from "@nestjs/common";
import { Users } from "src/entities/users.entity";
import { getConnection, getManager } from "typeorm";

@Injectable()
export class UserService {
  async find(): Promise<Users[]> {
    return await getManager().find(Users, { relations: ["photos"] });
  }

  async findOne(): Promise<Users> {
    return await getManager().findOne(Users, 3);
  }

  async findOneOrFail(): Promise<Users> {
    return await getManager().findOneOrFail(Users, 3);
  }

  async findAll(): Promise<Users[]> {
    return await getConnection()
      .getRepository(Users)
      .find({ relations: ["invites_from", "invites_to"] });
  }
}
