import {MigrationInterface, QueryRunner} from "typeorm";

export class num0021632378702996 implements MigrationInterface {
    name = 'num0021632378702996'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."direct_messages" DROP CONSTRAINT "FK_068096e0d3b8575537a155e56d7"`);
        await queryRunner.query(`ALTER TABLE "public"."direct_messages" DROP CONSTRAINT "FK_e0421a2b614fe91196e283518aa"`);
        await queryRunner.query(`ALTER TABLE "public"."photo" DROP CONSTRAINT "FK_4494006ff358f754d07df5ccc87"`);
        await queryRunner.query(`ALTER TABLE "public"."direct_messages" DROP COLUMN "userFromIdId"`);
        await queryRunner.query(`ALTER TABLE "public"."direct_messages" DROP COLUMN "userToIdId"`);
        await queryRunner.query(`ALTER TABLE "public"."direct_messages" ADD "user_from_id" integer`);
        await queryRunner.query(`ALTER TABLE "public"."direct_messages" ADD "user_to_id" integer`);
        await queryRunner.query(`ALTER TABLE "public"."direct_messages" ADD CONSTRAINT "FK_79f04f2cfbfaf95f8463b6a6f1c" FOREIGN KEY ("user_from_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "public"."direct_messages" ADD CONSTRAINT "FK_d8ba1bfebcd2dc2e8a9e2feca5d" FOREIGN KEY ("user_to_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "public"."photo" ADD CONSTRAINT "FK_4494006ff358f754d07df5ccc87" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."photo" DROP CONSTRAINT "FK_4494006ff358f754d07df5ccc87"`);
        await queryRunner.query(`ALTER TABLE "public"."direct_messages" DROP CONSTRAINT "FK_d8ba1bfebcd2dc2e8a9e2feca5d"`);
        await queryRunner.query(`ALTER TABLE "public"."direct_messages" DROP CONSTRAINT "FK_79f04f2cfbfaf95f8463b6a6f1c"`);
        await queryRunner.query(`ALTER TABLE "public"."direct_messages" DROP COLUMN "user_to_id"`);
        await queryRunner.query(`ALTER TABLE "public"."direct_messages" DROP COLUMN "user_from_id"`);
        await queryRunner.query(`ALTER TABLE "public"."direct_messages" ADD "userToIdId" integer`);
        await queryRunner.query(`ALTER TABLE "public"."direct_messages" ADD "userFromIdId" integer`);
        await queryRunner.query(`ALTER TABLE "public"."photo" ADD CONSTRAINT "FK_4494006ff358f754d07df5ccc87" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "public"."direct_messages" ADD CONSTRAINT "FK_e0421a2b614fe91196e283518aa" FOREIGN KEY ("userFromIdId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "public"."direct_messages" ADD CONSTRAINT "FK_068096e0d3b8575537a155e56d7" FOREIGN KEY ("userToIdId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
