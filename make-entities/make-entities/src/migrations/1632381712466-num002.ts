import { MigrationInterface, QueryRunner } from "typeorm";

export class num0021632381712466 implements MigrationInterface {
  name = "num0021632381712466";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "public"."photo" DROP CONSTRAINT "FK_4494006ff358f754d07df5ccc87"`
    );
    await queryRunner.query(
      `CREATE TABLE "direct_message_info" ("user_from_id" integer NOT NULL, "user_to_id" integer NOT NULL, "block" boolean NOT NULL DEFAULT false, "last_checked_message_id" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_093875e62dd5422bba5b233a401" PRIMARY KEY ("user_from_id", "user_to_id"))`
    );
    await queryRunner.query(
      `ALTER TABLE "direct_message_info" ADD CONSTRAINT "FK_b31685c9d799e5c9406cfd922f0" FOREIGN KEY ("user_from_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "direct_message_info" ADD CONSTRAINT "FK_26743e3988c6bded80698620806" FOREIGN KEY ("user_to_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
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
      `ALTER TABLE "direct_message_info" DROP CONSTRAINT "FK_26743e3988c6bded80698620806"`
    );
    await queryRunner.query(
      `ALTER TABLE "direct_message_info" DROP CONSTRAINT "FK_b31685c9d799e5c9406cfd922f0"`
    );
    await queryRunner.query(`DROP TABLE "direct_message_info"`);
    await queryRunner.query(
      `ALTER TABLE "public"."photo" ADD CONSTRAINT "FK_4494006ff358f754d07df5ccc87" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }
}
