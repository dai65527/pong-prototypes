import {MigrationInterface, QueryRunner} from "typeorm";

export class num0021632640791489 implements MigrationInterface {
    name = 'num0021632640791489'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."chatmember" DROP CONSTRAINT "FK_9887394283b495b2a6ad386a5d1"`);
        await queryRunner.query(`ALTER TABLE "public"."photo" DROP CONSTRAINT "FK_4494006ff358f754d07df5ccc87"`);
        await queryRunner.query(`ALTER TABLE "public"."chatmember" DROP COLUMN "user_to_id"`);
        await queryRunner.query(`ALTER TABLE "public"."chatmember" ADD CONSTRAINT "FK_0a2a7518bc0b64f75965490fca5" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "public"."photo" ADD CONSTRAINT "FK_4494006ff358f754d07df5ccc87" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."photo" DROP CONSTRAINT "FK_4494006ff358f754d07df5ccc87"`);
        await queryRunner.query(`ALTER TABLE "public"."chatmember" DROP CONSTRAINT "FK_0a2a7518bc0b64f75965490fca5"`);
        await queryRunner.query(`ALTER TABLE "public"."chatmember" ADD "user_to_id" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."photo" ADD CONSTRAINT "FK_4494006ff358f754d07df5ccc87" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "public"."chatmember" ADD CONSTRAINT "FK_9887394283b495b2a6ad386a5d1" FOREIGN KEY ("user_to_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
