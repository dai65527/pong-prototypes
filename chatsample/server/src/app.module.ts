import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MessageModule } from "./message/message.module";

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: ".env" }),
    TypeOrmModule.forRoot(),
    MessageModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
