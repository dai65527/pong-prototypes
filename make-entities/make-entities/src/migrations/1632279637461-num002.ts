import {MigrationInterface, QueryRunner} from "typeorm";

export class num0021632279637461 implements MigrationInterface {
    name = 'num0021632279637461'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."invites" DROP CONSTRAINT "FK_de64ee58c2437fdee71922c8ab3"`);
        await queryRunner.query(`ALTER TABLE "public"."invites" DROP CONSTRAINT "FK_e2d5083703d5925b35f8db270f3"`);
        await queryRunner.query(`ALTER TABLE "public"."photo" DROP CONSTRAINT "FK_4494006ff358f754d07df5ccc87"`);
        await queryRunner.query(`ALTER TABLE "public"."invites" DROP COLUMN "user_from_id"`);
        await queryRunner.query(`ALTER TABLE "public"."invites" DROP COLUMN "user_to_id"`);
        await queryRunner.query(`ALTER TABLE "public"."invites" ADD "userFromId" integer`);
        await queryRunner.query(`ALTER TABLE "public"."invites" ADD "userToId" integer`);
        await queryRunner.query(`ALTER TABLE "public"."invites" ADD CONSTRAINT "FK_fe4e5923cba4b85dab4f5df9557" FOREIGN KEY ("userFromId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "public"."invites" ADD CONSTRAINT "FK_bc53ceee2fb346a82c8847dc082" FOREIGN KEY ("userToId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "public"."photo" ADD CONSTRAINT "FK_4494006ff358f754d07df5ccc87" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."photo" DROP CONSTRAINT "FK_4494006ff358f754d07df5ccc87"`);
        await queryRunner.query(`ALTER TABLE "public"."invites" DROP CONSTRAINT "FK_bc53ceee2fb346a82c8847dc082"`);
        await queryRunner.query(`ALTER TABLE "public"."invites" DROP CONSTRAINT "FK_fe4e5923cba4b85dab4f5df9557"`);
        await queryRunner.query(`ALTER TABLE "public"."invites" DROP COLUMN "userToId"`);
        await queryRunner.query(`ALTER TABLE "public"."invites" DROP COLUMN "userFromId"`);
        await queryRunner.query(`ALTER TABLE "public"."invites" ADD "user_to_id" integer`);
        await queryRunner.query(`ALTER TABLE "public"."invites" ADD "user_from_id" integer`);
        await queryRunner.query(`ALTER TABLE "public"."photo" ADD CONSTRAINT "FK_4494006ff358f754d07df5ccc87" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "public"."invites" ADD CONSTRAINT "FK_e2d5083703d5925b35f8db270f3" FOREIGN KEY ("user_to_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "public"."invites" ADD CONSTRAINT "FK_de64ee58c2437fdee71922c8ab3" FOREIGN KEY ("user_from_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
