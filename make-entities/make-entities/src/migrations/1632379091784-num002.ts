import {MigrationInterface, QueryRunner} from "typeorm";

export class num0021632379091784 implements MigrationInterface {
    name = 'num0021632379091784'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."photo" DROP CONSTRAINT "FK_4494006ff358f754d07df5ccc87"`);
        await queryRunner.query(`ALTER TABLE "public"."direct_messages" DROP CONSTRAINT "FK_79f04f2cfbfaf95f8463b6a6f1c"`);
        await queryRunner.query(`ALTER TABLE "public"."direct_messages" DROP CONSTRAINT "FK_d8ba1bfebcd2dc2e8a9e2feca5d"`);
        await queryRunner.query(`ALTER TABLE "public"."direct_messages" ALTER COLUMN "user_from_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."direct_messages" ALTER COLUMN "user_to_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."direct_messages" ADD CONSTRAINT "FK_79f04f2cfbfaf95f8463b6a6f1c" FOREIGN KEY ("user_from_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "public"."direct_messages" ADD CONSTRAINT "FK_d8ba1bfebcd2dc2e8a9e2feca5d" FOREIGN KEY ("user_to_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "public"."photo" ADD CONSTRAINT "FK_4494006ff358f754d07df5ccc87" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."photo" DROP CONSTRAINT "FK_4494006ff358f754d07df5ccc87"`);
        await queryRunner.query(`ALTER TABLE "public"."direct_messages" DROP CONSTRAINT "FK_d8ba1bfebcd2dc2e8a9e2feca5d"`);
        await queryRunner.query(`ALTER TABLE "public"."direct_messages" DROP CONSTRAINT "FK_79f04f2cfbfaf95f8463b6a6f1c"`);
        await queryRunner.query(`ALTER TABLE "public"."direct_messages" ALTER COLUMN "user_to_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."direct_messages" ALTER COLUMN "user_from_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."direct_messages" ADD CONSTRAINT "FK_d8ba1bfebcd2dc2e8a9e2feca5d" FOREIGN KEY ("user_to_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "public"."direct_messages" ADD CONSTRAINT "FK_79f04f2cfbfaf95f8463b6a6f1c" FOREIGN KEY ("user_from_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "public"."photo" ADD CONSTRAINT "FK_4494006ff358f754d07df5ccc87" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
