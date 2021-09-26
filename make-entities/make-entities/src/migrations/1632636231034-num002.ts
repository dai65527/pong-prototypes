import {MigrationInterface, QueryRunner} from "typeorm";

export class num0021632636231034 implements MigrationInterface {
    name = 'num0021632636231034'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."photo" DROP CONSTRAINT "FK_4494006ff358f754d07df5ccc87"`);
        await queryRunner.query(`CREATE TABLE "games" ("id" SERIAL NOT NULL, "user_first_point" integer NOT NULL DEFAULT '0', "user_second_point" integer NOT NULL DEFAULT '0', "user_first_level" integer NOT NULL, "user_second_level" integer NOT NULL, "points_to_win" integer NOT NULL, "bar_length" integer NOT NULL, "ball_speed" integer NOT NULL, "map_id" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "started_at" TIMESTAMP, "finished_at" TIMESTAMP, "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "user_first_id" integer, "user_second_id" integer, CONSTRAINT "PK_c9b16b62917b5595af982d66337" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_b60814b5a5112e5657e21b5c1b" ON "games" ("user_first_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_f2d3738626b433dd918712e7f5" ON "games" ("user_second_id") `);
        await queryRunner.query(`ALTER TABLE "games" ADD CONSTRAINT "FK_b60814b5a5112e5657e21b5c1ba" FOREIGN KEY ("user_first_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "games" ADD CONSTRAINT "FK_f2d3738626b433dd918712e7f5e" FOREIGN KEY ("user_second_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "public"."photo" ADD CONSTRAINT "FK_4494006ff358f754d07df5ccc87" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."photo" DROP CONSTRAINT "FK_4494006ff358f754d07df5ccc87"`);
        await queryRunner.query(`ALTER TABLE "games" DROP CONSTRAINT "FK_f2d3738626b433dd918712e7f5e"`);
        await queryRunner.query(`ALTER TABLE "games" DROP CONSTRAINT "FK_b60814b5a5112e5657e21b5c1ba"`);
        await queryRunner.query(`DROP INDEX "IDX_f2d3738626b433dd918712e7f5"`);
        await queryRunner.query(`DROP INDEX "IDX_b60814b5a5112e5657e21b5c1b"`);
        await queryRunner.query(`DROP TABLE "games"`);
        await queryRunner.query(`ALTER TABLE "public"."photo" ADD CONSTRAINT "FK_4494006ff358f754d07df5ccc87" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
