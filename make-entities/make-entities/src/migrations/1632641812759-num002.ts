import {MigrationInterface, QueryRunner} from "typeorm";

export class num0021632641812759 implements MigrationInterface {
    name = 'num0021632641812759'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."photo" DROP CONSTRAINT "FK_4494006ff358f754d07df5ccc87"`);
        await queryRunner.query(`ALTER TABLE "public"."chats" DROP CONSTRAINT "FK_fe259bf83d8aac1091be2fac967"`);
        await queryRunner.query(`ALTER TABLE "public"."chats" DROP CONSTRAINT "FK_1036e0aa7a7168c500808e9519c"`);
        await queryRunner.query(`ALTER TABLE "public"."chats" ALTER COLUMN "owner_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."chats" ALTER COLUMN "admin_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."chats" ADD CONSTRAINT "FK_fe259bf83d8aac1091be2fac967" FOREIGN KEY ("owner_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "public"."chats" ADD CONSTRAINT "FK_1036e0aa7a7168c500808e9519c" FOREIGN KEY ("admin_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "public"."photo" ADD CONSTRAINT "FK_4494006ff358f754d07df5ccc87" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."photo" DROP CONSTRAINT "FK_4494006ff358f754d07df5ccc87"`);
        await queryRunner.query(`ALTER TABLE "public"."chats" DROP CONSTRAINT "FK_1036e0aa7a7168c500808e9519c"`);
        await queryRunner.query(`ALTER TABLE "public"."chats" DROP CONSTRAINT "FK_fe259bf83d8aac1091be2fac967"`);
        await queryRunner.query(`ALTER TABLE "public"."chats" ALTER COLUMN "admin_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."chats" ALTER COLUMN "owner_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."chats" ADD CONSTRAINT "FK_1036e0aa7a7168c500808e9519c" FOREIGN KEY ("admin_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "public"."chats" ADD CONSTRAINT "FK_fe259bf83d8aac1091be2fac967" FOREIGN KEY ("owner_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "public"."photo" ADD CONSTRAINT "FK_4494006ff358f754d07df5ccc87" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
