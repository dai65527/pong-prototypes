import { MigrationInterface, QueryRunner } from "typeorm";

export class num0021632630527012 implements MigrationInterface {
  name = "num0021632630527012";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "public"."photo" DROP CONSTRAINT "FK_4494006ff358f754d07df5ccc87"`
    );
    await queryRunner.query(
      `CREATE TABLE "chatmember" ("chat_id" integer NOT NULL, "user_id" integer NOT NULL, "muted_until" TIMESTAMP, "banned_until" TIMESTAMP, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "user_to_id" integer NOT NULL, "last_checked_message_id" integer, CONSTRAINT "PK_40dedad8629a0949fc5493f22a0" PRIMARY KEY ("chat_id", "user_id"))`
    );
    await queryRunner.query(
      `ALTER TABLE "chatmember" ADD CONSTRAINT "FK_4a38401bcc9ee9b11f0516b9981" FOREIGN KEY ("chat_id") REFERENCES "chats"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "chatmember" ADD CONSTRAINT "FK_9887394283b495b2a6ad386a5d1" FOREIGN KEY ("user_to_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "chatmember" ADD CONSTRAINT "FK_776eb799203bc7a3feda3924a81" FOREIGN KEY ("last_checked_message_id") REFERENCES "chat_messages"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
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
      `ALTER TABLE "chatmember" DROP CONSTRAINT "FK_776eb799203bc7a3feda3924a81"`
    );
    await queryRunner.query(
      `ALTER TABLE "chatmember" DROP CONSTRAINT "FK_9887394283b495b2a6ad386a5d1"`
    );
    await queryRunner.query(
      `ALTER TABLE "chatmember" DROP CONSTRAINT "FK_4a38401bcc9ee9b11f0516b9981"`
    );
    await queryRunner.query(`DROP TABLE "chatmember"`);
    await queryRunner.query(
      `ALTER TABLE "public"."photo" ADD CONSTRAINT "FK_4494006ff358f754d07df5ccc87" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }
}
