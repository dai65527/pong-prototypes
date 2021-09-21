import {MigrationInterface, QueryRunner} from "typeorm";

export class num0021632189575598 implements MigrationInterface {
    name = 'num0021632189575598'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "intra_id" character varying NOT NULL, "email" character varying NOT NULL, "rate" integer NOT NULL, "status" integer NOT NULL, "onetimepass_digest" character varying NOT NULL, "remenber_digest" character varying NOT NULL, "avatar" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
