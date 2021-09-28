import { MigrationInterface, QueryRunner } from "typeorm";

export class num0021632639254634 implements MigrationInterface {
  name = "num0021632639254634";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "public"."photo" DROP CONSTRAINT "FK_4494006ff358f754d07df5ccc87"`
    );
    await queryRunner.query(
      `ALTER TABLE "public"."users" DROP COLUMN "created_at"`
    );
    await queryRunner.query(
      `ALTER TABLE "public"."users" ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`
    );
    await queryRunner.query(
      `ALTER TABLE "public"."users" DROP COLUMN "updated_at"`
    );
    await queryRunner.query(
      `ALTER TABLE "public"."users" ADD "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`
    );
    await queryRunner.query(
      `ALTER TABLE "public"."photo" ADD CONSTRAINT "FK_4494006ff358f754d07df5ccc87" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "public"."photo" DROP CONSTRAINT "FK_4494006ff358f754d07df5ccc87"`
    );
    await queryRunner.query(
      `ALTER TABLE "public"."users" DROP COLUMN "updated_at"`
    );
    await queryRunner.query(
      `ALTER TABLE "public"."users" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`
    );
    await queryRunner.query(
      `ALTER TABLE "public"."users" DROP COLUMN "created_at"`
    );
    await queryRunner.query(
      `ALTER TABLE "public"."users" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`
    );
    await queryRunner.query(
      `ALTER TABLE "public"."photo" ADD CONSTRAINT "FK_4494006ff358f754d07df5ccc87" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }
}
