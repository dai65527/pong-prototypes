import { MigrationInterface, QueryRunner } from "typeorm";

export class num0021632621840373 implements MigrationInterface {
  name = "num0021632621840373";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "public"."photo" DROP CONSTRAINT "FK_4494006ff358f754d07df5ccc87"`
    );
    await queryRunner.query(
      `CREATE TABLE "chats" ("id" SERIAL NOT NULL, "name" text NOT NULL, "password_digest" text NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_0117647b3c4a4e5ff198aeb6206" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_79f04f2cfbfaf95f8463b6a6f1" ON "public"."direct_messages" ("user_from_id") `
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_d8ba1bfebcd2dc2e8a9e2feca5" ON "public"."direct_messages" ("user_to_id") `
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
      `DROP INDEX "public"."IDX_d8ba1bfebcd2dc2e8a9e2feca5"`
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_79f04f2cfbfaf95f8463b6a6f1"`
    );
    await queryRunner.query(`DROP TABLE "chats"`);
    await queryRunner.query(
      `ALTER TABLE "public"."photo" ADD CONSTRAINT "FK_4494006ff358f754d07df5ccc87" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }
}
