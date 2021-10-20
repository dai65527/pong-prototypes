import {MigrationInterface, QueryRunner} from "typeorm";

export class num0021632795113730 implements MigrationInterface {
    name = 'num0021632795113730'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."photo" DROP CONSTRAINT "FK_4494006ff358f754d07df5ccc87"`);
        await queryRunner.query(`ALTER TABLE "public"."games" ALTER COLUMN "points_to_win" SET DEFAULT '10'`);
        await queryRunner.query(`ALTER TABLE "public"."games" ADD CONSTRAINT "CHK_7c71df0dcf3ed9c4cb810db0de" CHECK ("points_to_win" IN (5, 10, 15))`);
        await queryRunner.query(`ALTER TABLE "public"."photo" ADD CONSTRAINT "FK_4494006ff358f754d07df5ccc87" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."photo" DROP CONSTRAINT "FK_4494006ff358f754d07df5ccc87"`);
        await queryRunner.query(`ALTER TABLE "public"."games" DROP CONSTRAINT "CHK_7c71df0dcf3ed9c4cb810db0de"`);
        await queryRunner.query(`ALTER TABLE "public"."games" ALTER COLUMN "points_to_win" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "public"."photo" ADD CONSTRAINT "FK_4494006ff358f754d07df5ccc87" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
