import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Request,
  UnauthorizedException,
  UseGuards,
  ValidationPipe,
} from "@nestjs/common";
import { SignInDto, SignUpDto } from "./dto/user.dto";
import { UsersService } from "./users.service";
import { AuthGuard } from "@nestjs/passport";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(":id")
  // @UseGuards(AuthGuard("jwt"))
  findOne(@Param("id") id: number, @Request() req: any) {
    // if (req.user.intraId !== intraId) {
    //   throw new UnauthorizedException("invalid token");
    // }
    return this.usersService.findById(id);
  }

  @Post("signup")
  async signup(@Body(ValidationPipe) userInfo: SignUpDto) {
    await this.usersService.signUp(userInfo);
  }
}
