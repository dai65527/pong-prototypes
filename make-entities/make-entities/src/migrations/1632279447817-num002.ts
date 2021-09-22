import { MigrationInterface, QueryRunner } from "typeorm";

export class num0021632279447817 implements MigrationInterface {
  name = "num0021632279447817";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "public"."photo" DROP CONSTRAINT "FK_4494006ff358f754d07df5ccc87"`
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_6f14acdf2468385544a756fcea"`
    );
    await queryRunner.query(
      `ALTER TABLE "public"."invites" DROP CONSTRAINT "PK_aa52e96b44a714372f4dd31a0af"`
    );
    await queryRunner.query(`ALTER TABLE "public"."invites" DROP COLUMN "id"`);
    await queryRunner.query(
      `ALTER TABLE "public"."invites" ADD "user_from" integer NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "public"."invites" ADD CONSTRAINT "PK_5c16ed8bab9b7400815a822c933" PRIMARY KEY ("user_from")`
    );
    await queryRunner.query(
      `ALTER TABLE "public"."invites" ADD "user_to" integer NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "public"."invites" DROP CONSTRAINT "PK_5c16ed8bab9b7400815a822c933"`
    );
    await queryRunner.query(
      `ALTER TABLE "public"."invites" ADD CONSTRAINT "PK_9b934c1ddc81693eae266a51b71" PRIMARY KEY ("user_from", "user_to")`
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_9b934c1ddc81693eae266a51b7" ON "public"."invites" ("user_from", "user_to") `
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
      `DROP INDEX "public"."IDX_9b934c1ddc81693eae266a51b7"`
    );
    await queryRunner.query(
      `ALTER TABLE "public"."invites" DROP CONSTRAINT "PK_9b934c1ddc81693eae266a51b71"`
    );
    await queryRunner.query(
      `ALTER TABLE "public"."invites" ADD CONSTRAINT "PK_5c16ed8bab9b7400815a822c933" PRIMARY KEY ("user_from")`
    );
    await queryRunner.query(
      `ALTER TABLE "public"."invites" DROP COLUMN "user_to"`
    );
    await queryRunner.query(
      `ALTER TABLE "public"."invites" DROP CONSTRAINT "PK_5c16ed8bab9b7400815a822c933"`
    );
    await queryRunner.query(
      `ALTER TABLE "public"."invites" DROP COLUMN "user_from"`
    );
    await queryRunner.query(
      `ALTER TABLE "public"."invites" ADD "id" SERIAL NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "public"."invites" ADD CONSTRAINT "PK_aa52e96b44a714372f4dd31a0af" PRIMARY KEY ("id")`
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_6f14acdf2468385544a756fcea" ON "public"."invites" ("user_from_id", "user_to_id") `
    );
    await queryRunner.query(
      `ALTER TABLE "public"."photo" ADD CONSTRAINT "FK_4494006ff358f754d07df5ccc87" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }
}
