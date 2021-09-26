import {MigrationInterface, QueryRunner} from "typeorm";

export class num0021632630789225 implements MigrationInterface {
    name = 'num0021632630789225'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."photo" DROP CONSTRAINT "FK_4494006ff358f754d07df5ccc87"`);
        await queryRunner.query(`CREATE INDEX "IDX_de64ee58c2437fdee71922c8ab" ON "public"."invites" ("user_from_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_e2d5083703d5925b35f8db270f" ON "public"."invites" ("user_to_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_b31685c9d799e5c9406cfd922f" ON "public"."direct_message_info" ("user_from_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_26743e3988c6bded8069862080" ON "public"."direct_message_info" ("user_to_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_2c711b3d345d8f678ea7d34d96" ON "public"."friends" ("user_from_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_ac8818cd9514f84a394e99ebc3" ON "public"."friends" ("user_to_id") `);
        await queryRunner.query(`ALTER TABLE "public"."photo" ADD CONSTRAINT "FK_4494006ff358f754d07df5ccc87" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."photo" DROP CONSTRAINT "FK_4494006ff358f754d07df5ccc87"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_ac8818cd9514f84a394e99ebc3"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_2c711b3d345d8f678ea7d34d96"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_26743e3988c6bded8069862080"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_b31685c9d799e5c9406cfd922f"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_e2d5083703d5925b35f8db270f"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_de64ee58c2437fdee71922c8ab"`);
        await queryRunner.query(`ALTER TABLE "public"."photo" ADD CONSTRAINT "FK_4494006ff358f754d07df5ccc87" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
