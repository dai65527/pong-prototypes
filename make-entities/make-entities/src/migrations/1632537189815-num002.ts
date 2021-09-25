import { MigrationInterface, QueryRunner } from "typeorm";

export class num0021632537189815 implements MigrationInterface {
  name = "num0021632537189815";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "friends" ("user_from_id" integer NOT NULL, "user_to_id" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_de97224b801b2bd81a3018e3c18" PRIMARY KEY ("user_from_id", "user_to_id"))`
    );
    await queryRunner.query(
      `ALTER TABLE "friends" ADD CONSTRAINT "FK_2c711b3d345d8f678ea7d34d965" FOREIGN KEY ("user_from_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "friends" ADD CONSTRAINT "FK_ac8818cd9514f84a394e99ebc35" FOREIGN KEY ("user_to_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "friends" DROP CONSTRAINT "FK_ac8818cd9514f84a394e99ebc35"`
    );
    await queryRunner.query(
      `ALTER TABLE "friends" DROP CONSTRAINT "FK_2c711b3d345d8f678ea7d34d965"`
    );
    await queryRunner.query(`DROP TABLE "friends"`);
  }
}
