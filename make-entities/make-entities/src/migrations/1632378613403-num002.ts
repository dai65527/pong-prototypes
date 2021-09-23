import {MigrationInterface, QueryRunner} from "typeorm";

export class num0021632378613403 implements MigrationInterface {
    name = 'num0021632378613403'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."photo" DROP CONSTRAINT "FK_4494006ff358f754d07df5ccc87"`);
        await queryRunner.query(`CREATE TABLE "direct_messages" ("id" SERIAL NOT NULL, "message" text NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "userFromIdId" integer, "userToIdId" integer, CONSTRAINT "PK_8373c1bb93939978ef05ae650d1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "direct_messages" ADD CONSTRAINT "FK_e0421a2b614fe91196e283518aa" FOREIGN KEY ("userFromIdId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "direct_messages" ADD CONSTRAINT "FK_068096e0d3b8575537a155e56d7" FOREIGN KEY ("userToIdId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "public"."photo" ADD CONSTRAINT "FK_4494006ff358f754d07df5ccc87" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."photo" DROP CONSTRAINT "FK_4494006ff358f754d07df5ccc87"`);
        await queryRunner.query(`ALTER TABLE "direct_messages" DROP CONSTRAINT "FK_068096e0d3b8575537a155e56d7"`);
        await queryRunner.query(`ALTER TABLE "direct_messages" DROP CONSTRAINT "FK_e0421a2b614fe91196e283518aa"`);
        await queryRunner.query(`DROP TABLE "direct_messages"`);
        await queryRunner.query(`ALTER TABLE "public"."photo" ADD CONSTRAINT "FK_4494006ff358f754d07df5ccc87" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
