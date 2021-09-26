import { MigrationInterface, QueryRunner } from "typeorm";

export class num0021632630619519 implements MigrationInterface {
  name = "num0021632630619519";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "public"."photo" DROP CONSTRAINT "FK_4494006ff358f754d07df5ccc87"`
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_4a38401bcc9ee9b11f0516b998" ON "public"."chatmember" ("chat_id") `
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_0a2a7518bc0b64f75965490fca" ON "public"."chatmember" ("user_id") `
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
      `DROP INDEX "public"."IDX_0a2a7518bc0b64f75965490fca"`
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_4a38401bcc9ee9b11f0516b998"`
    );
    await queryRunner.query(
      `ALTER TABLE "public"."photo" ADD CONSTRAINT "FK_4494006ff358f754d07df5ccc87" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }
}
