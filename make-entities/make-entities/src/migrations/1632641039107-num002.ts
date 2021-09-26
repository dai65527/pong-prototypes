import {MigrationInterface, QueryRunner} from "typeorm";

export class num0021632641039107 implements MigrationInterface {
    name = 'num0021632641039107'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."chats" DROP CONSTRAINT "FK_0bf408c860714629fa5db0d5659"`);
        await queryRunner.query(`ALTER TABLE "public"."chats" DROP CONSTRAINT "FK_7151740489b3075548d9cdfff60"`);
        await queryRunner.query(`ALTER TABLE "public"."photo" DROP CONSTRAINT "FK_4494006ff358f754d07df5ccc87"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_0bf408c860714629fa5db0d565"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_7151740489b3075548d9cdfff6"`);
        await queryRunner.query(`ALTER TABLE "public"."chats" DROP COLUMN "user_from_id"`);
        await queryRunner.query(`ALTER TABLE "public"."chats" DROP COLUMN "user_to_id"`);
        await queryRunner.query(`ALTER TABLE "public"."chats" ADD "owner_id" integer`);
        await queryRunner.query(`ALTER TABLE "public"."chats" ADD "admin_id" integer NOT NULL`);
        await queryRunner.query(`CREATE INDEX "IDX_fe259bf83d8aac1091be2fac96" ON "public"."chats" ("owner_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_1036e0aa7a7168c500808e9519" ON "public"."chats" ("admin_id") `);
        await queryRunner.query(`ALTER TABLE "public"."chats" ADD CONSTRAINT "FK_fe259bf83d8aac1091be2fac967" FOREIGN KEY ("owner_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "public"."chats" ADD CONSTRAINT "FK_1036e0aa7a7168c500808e9519c" FOREIGN KEY ("admin_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "public"."photo" ADD CONSTRAINT "FK_4494006ff358f754d07df5ccc87" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."photo" DROP CONSTRAINT "FK_4494006ff358f754d07df5ccc87"`);
        await queryRunner.query(`ALTER TABLE "public"."chats" DROP CONSTRAINT "FK_1036e0aa7a7168c500808e9519c"`);
        await queryRunner.query(`ALTER TABLE "public"."chats" DROP CONSTRAINT "FK_fe259bf83d8aac1091be2fac967"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_1036e0aa7a7168c500808e9519"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_fe259bf83d8aac1091be2fac96"`);
        await queryRunner.query(`ALTER TABLE "public"."chats" DROP COLUMN "admin_id"`);
        await queryRunner.query(`ALTER TABLE "public"."chats" DROP COLUMN "owner_id"`);
        await queryRunner.query(`ALTER TABLE "public"."chats" ADD "user_to_id" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."chats" ADD "user_from_id" integer NOT NULL`);
        await queryRunner.query(`CREATE INDEX "IDX_7151740489b3075548d9cdfff6" ON "public"."chats" ("user_to_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_0bf408c860714629fa5db0d565" ON "public"."chats" ("user_from_id") `);
        await queryRunner.query(`ALTER TABLE "public"."photo" ADD CONSTRAINT "FK_4494006ff358f754d07df5ccc87" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "public"."chats" ADD CONSTRAINT "FK_7151740489b3075548d9cdfff60" FOREIGN KEY ("user_to_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "public"."chats" ADD CONSTRAINT "FK_0bf408c860714629fa5db0d5659" FOREIGN KEY ("user_from_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
