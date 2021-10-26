import { Controller, Get, Post, Req, Res } from '@nestjs/common';
import csurf from 'csurf';
import { AppService } from './app.service';
import { Csrf } from 'ncsrf';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/token')
  getCsrfToken(@Req() req, @Res() res): any {
    res.json({ csrfToken: req.csrfToken() });
    return 'Set Token';
  }

  @Post()
  needProtect(): string {
    return 'Protected!';
  }
}
