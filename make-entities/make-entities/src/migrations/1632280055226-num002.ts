import {MigrationInterface, QueryRunner} from "typeorm";

export class num0021632280055226 implements MigrationInterface {
    name = 'num0021632280055226'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."photo" DROP CONSTRAINT "FK_4494006ff358f754d07df5ccc87"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_9b934c1ddc81693eae266a51b7"`);
        await queryRunner.query(`ALTER TABLE "public"."invites" DROP CONSTRAINT "PK_9b934c1ddc81693eae266a51b71"`);
        await queryRunner.query(`ALTER TABLE "public"."invites" ADD CONSTRAINT "PK_966d17b2463a454a4aca1776d7d" PRIMARY KEY ("user_to")`);
        await queryRunner.query(`ALTER TABLE "public"."invites" DROP COLUMN "user_from"`);
        await queryRunner.query(`ALTER TABLE "public"."invites" DROP CONSTRAINT "PK_966d17b2463a454a4aca1776d7d"`);
        await queryRunner.query(`ALTER TABLE "public"."invites" DROP COLUMN "user_to"`);
        await queryRunner.query(`ALTER TABLE "public"."invites" ADD CONSTRAINT "PK_6f14acdf2468385544a756fceac" PRIMARY KEY ("user_from_id", "user_to_id")`);
        await queryRunner.query(`ALTER TABLE "public"."invites" DROP CONSTRAINT "FK_de64ee58c2437fdee71922c8ab3"`);
        await queryRunner.query(`ALTER TABLE "public"."invites" DROP CONSTRAINT "FK_e2d5083703d5925b35f8db270f3"`);
        await queryRunner.query(`ALTER TABLE "public"."invites" ALTER COLUMN "user_from_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."invites" ALTER COLUMN "user_to_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."invites" ADD CONSTRAINT "FK_de64ee58c2437fdee71922c8ab3" FOREIGN KEY ("user_from_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "public"."invites" ADD CONSTRAINT "FK_e2d5083703d5925b35f8db270f3" FOREIGN KEY ("user_to_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "public"."photo" ADD CONSTRAINT "FK_4494006ff358f754d07df5ccc87" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."photo" DROP CONSTRAINT "FK_4494006ff358f754d07df5ccc87"`);
        await queryRunner.query(`ALTER TABLE "public"."invites" DROP CONSTRAINT "FK_e2d5083703d5925b35f8db270f3"`);
        await queryRunner.query(`ALTER TABLE "public"."invites" DROP CONSTRAINT "FK_de64ee58c2437fdee71922c8ab3"`);
        await queryRunner.query(`ALTER TABLE "public"."invites" ALTER COLUMN "user_to_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."invites" ALTER COLUMN "user_from_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."invites" ADD CONSTRAINT "FK_e2d5083703d5925b35f8db270f3" FOREIGN KEY ("user_to_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "public"."invites" ADD CONSTRAINT "FK_de64ee58c2437fdee71922c8ab3" FOREIGN KEY ("user_from_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "public"."invites" DROP CONSTRAINT "PK_6f14acdf2468385544a756fceac"`);
        await queryRunner.query(`ALTER TABLE "public"."invites" ADD "user_to" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."invites" ADD CONSTRAINT "PK_966d17b2463a454a4aca1776d7d" PRIMARY KEY ("user_to")`);
        await queryRunner.query(`ALTER TABLE "public"."invites" ADD "user_from" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."invites" DROP CONSTRAINT "PK_966d17b2463a454a4aca1776d7d"`);
        await queryRunner.query(`ALTER TABLE "public"."invites" ADD CONSTRAINT "PK_9b934c1ddc81693eae266a51b71" PRIMARY KEY ("user_from", "user_to")`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_9b934c1ddc81693eae266a51b7" ON "public"."invites" ("user_from", "user_to") `);
        await queryRunner.query(`ALTER TABLE "public"."photo" ADD CONSTRAINT "FK_4494006ff358f754d07df5ccc87" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
