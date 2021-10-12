import { Body, Controller, Post, Res, ValidationPipe } from "@nestjs/common";
import { Response } from "express";
import { SignInDto } from "src/users/dto/user.dto";
import { AuthService } from "./auth.service";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("login")
  async login(
    @Body(ValidationPipe) req: SignInDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const token = await this.authService.login(req.email, req.password);
    if (token && token !== "") {
      res.cookie("pongjwttoken", token);
    }
  }
}
