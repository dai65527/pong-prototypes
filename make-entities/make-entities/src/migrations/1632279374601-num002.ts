import { MigrationInterface, QueryRunner } from "typeorm";

export class num0021632279374601 implements MigrationInterface {
  name = "num0021632279374601";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "public"."photo" DROP CONSTRAINT "FK_4494006ff358f754d07df5ccc87"`
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "intra_id" character varying NOT NULL, "email" character varying, "rate" integer NOT NULL DEFAULT '0', "status" integer NOT NULL, "onetimepass_digest" character varying NOT NULL, "remenber_digest" character varying NOT NULL, "avatar" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_51b8b26ac168fbe7d6f5653e6cf" UNIQUE ("name"), CONSTRAINT "UQ_e3a88bfa3a0891f44f09eadc739" UNIQUE ("intra_id"), CONSTRAINT "CHK_802c207f73c295afb7272bf8d6" CHECK ("rate" >= 0), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_51b8b26ac168fbe7d6f5653e6c" ON "users" ("name") `
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_e3a88bfa3a0891f44f09eadc73" ON "users" ("intra_id") `
    );
    await queryRunner.query(
      `CREATE TABLE "invites" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "user_from_id" integer, "user_to_id" integer, CONSTRAINT "PK_aa52e96b44a714372f4dd31a0af" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_6f14acdf2468385544a756fcea" ON "invites" ("user_from_id", "user_to_id") `
    );
    await queryRunner.query(
      `ALTER TABLE "invites" ADD CONSTRAINT "FK_de64ee58c2437fdee71922c8ab3" FOREIGN KEY ("user_from_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "invites" ADD CONSTRAINT "FK_e2d5083703d5925b35f8db270f3" FOREIGN KEY ("user_to_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
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
      `ALTER TABLE "invites" DROP CONSTRAINT "FK_e2d5083703d5925b35f8db270f3"`
    );
    await queryRunner.query(
      `ALTER TABLE "invites" DROP CONSTRAINT "FK_de64ee58c2437fdee71922c8ab3"`
    );
    await queryRunner.query(`DROP INDEX "IDX_6f14acdf2468385544a756fcea"`);
    await queryRunner.query(`DROP TABLE "invites"`);
    await queryRunner.query(`DROP INDEX "IDX_e3a88bfa3a0891f44f09eadc73"`);
    await queryRunner.query(`DROP INDEX "IDX_51b8b26ac168fbe7d6f5653e6c"`);
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(
      `ALTER TABLE "public"."photo" ADD CONSTRAINT "FK_4494006ff358f754d07df5ccc87" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }
}
