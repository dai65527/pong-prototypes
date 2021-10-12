import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "src/users/users.service";
import * as bcrypt from "bcryptjs";
import { JwtPayload } from "./interfaces/jwt-payload.interface";

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  async validateUser(email: string, password: string): Promise<boolean> {
    const user = await this.usersService.findByEmail(email);
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      throw new UnauthorizedException("invalid credentials");
    }
    return isValid;
  }

  async createTokenByEmail(email: string): Promise<string> {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new InternalServerErrorException();
    }
    const payload: JwtPayload = {
      username: user.name,
      email: user.email,
      intraId: user.intraId,
    };
    return this.jwtService.sign(payload);
  }

  public login = async (email: string, password: string): Promise<string> => {
    if (!(await this.validateUser(email, password))) {
      return null;
    }
    return this.createTokenByEmail(email);
  };
}
