import {MigrationInterface, QueryRunner} from "typeorm";

export class num0021632395434325 implements MigrationInterface {
    name = 'num0021632395434325'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."photo" DROP CONSTRAINT "FK_4494006ff358f754d07df5ccc87"`);
        await queryRunner.query(`ALTER TABLE "public"."direct_message_info" ALTER COLUMN "last_checked_message_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."direct_message_info" ADD CONSTRAINT "FK_01fa44a72cd7a086948af62cdad" FOREIGN KEY ("last_checked_message_id") REFERENCES "direct_messages"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "public"."photo" ADD CONSTRAINT "FK_4494006ff358f754d07df5ccc87" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."photo" DROP CONSTRAINT "FK_4494006ff358f754d07df5ccc87"`);
        await queryRunner.query(`ALTER TABLE "public"."direct_message_info" DROP CONSTRAINT "FK_01fa44a72cd7a086948af62cdad"`);
        await queryRunner.query(`ALTER TABLE "public"."direct_message_info" ALTER COLUMN "last_checked_message_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."photo" ADD CONSTRAINT "FK_4494006ff358f754d07df5ccc87" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
