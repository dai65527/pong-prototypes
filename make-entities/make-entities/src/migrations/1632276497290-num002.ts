import {MigrationInterface, QueryRunner} from "typeorm";

export class num0021632276497290 implements MigrationInterface {
    name = 'num0021632276497290'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "intra_id" character varying NOT NULL, "email" character varying, "rate" integer NOT NULL DEFAULT '0', "status" integer NOT NULL, "onetimepass_digest" character varying NOT NULL, "remenber_digest" character varying NOT NULL, "avatar" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_51b8b26ac168fbe7d6f5653e6cf" UNIQUE ("name"), CONSTRAINT "UQ_e3a88bfa3a0891f44f09eadc739" UNIQUE ("intra_id"), CONSTRAINT "CHK_802c207f73c295afb7272bf8d6" CHECK ("rate" >= 0), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_51b8b26ac168fbe7d6f5653e6c" ON "users" ("name") `);
        await queryRunner.query(`CREATE INDEX "IDX_e3a88bfa3a0891f44f09eadc73" ON "users" ("intra_id") `);
        await queryRunner.query(`CREATE TABLE "invites" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "userFromId" integer, "userToId" integer, CONSTRAINT "PK_aa52e96b44a714372f4dd31a0af" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_9ef85da707137c9d9f6eaf259d" ON "invites" ("userFromId", "userToId") `);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "isActive" boolean NOT NULL DEFAULT true, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "photo" ("id" SERIAL NOT NULL, "url" character varying NOT NULL, "userId" integer, CONSTRAINT "PK_723fa50bf70dcfd06fb5a44d4ff" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "invites" ADD CONSTRAINT "FK_fe4e5923cba4b85dab4f5df9557" FOREIGN KEY ("userFromId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "invites" ADD CONSTRAINT "FK_bc53ceee2fb346a82c8847dc082" FOREIGN KEY ("userToId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "photo" ADD CONSTRAINT "FK_4494006ff358f754d07df5ccc87" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "photo" DROP CONSTRAINT "FK_4494006ff358f754d07df5ccc87"`);
        await queryRunner.query(`ALTER TABLE "invites" DROP CONSTRAINT "FK_bc53ceee2fb346a82c8847dc082"`);
        await queryRunner.query(`ALTER TABLE "invites" DROP CONSTRAINT "FK_fe4e5923cba4b85dab4f5df9557"`);
        await queryRunner.query(`DROP TABLE "photo"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP INDEX "IDX_9ef85da707137c9d9f6eaf259d"`);
        await queryRunner.query(`DROP TABLE "invites"`);
        await queryRunner.query(`DROP INDEX "IDX_e3a88bfa3a0891f44f09eadc73"`);
        await queryRunner.query(`DROP INDEX "IDX_51b8b26ac168fbe7d6f5653e6c"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
