import { Injectable, NotFoundException } from "@nestjs/common";
import { User } from "./users.entity";
import { SignUpDto, UserResponse } from "./dto/user.dto";
import * as bcrypt from "bcryptjs";
import { Sign } from "crypto";
import { async } from "rxjs";

@Injectable()
export class UsersService {
  public findById = async (id: number): Promise<UserResponse> => {
    const foundUser = await User.findOne({ id });
    if (!foundUser) {
      throw new NotFoundException();
    }
    return new UserResponse(foundUser.name, foundUser.email);
  };

  public findByEmail = async (email: string): Promise<User> => {
    return await User.findOne({ where: { email } });
  };

  public signUp = async (userInfo: SignUpDto) => {
    const newUser = new User(
      userInfo.email,
      userInfo.name,
      await bcrypt.hash(userInfo.password, 12),
    );
    return await newUser.save();
  };
}
