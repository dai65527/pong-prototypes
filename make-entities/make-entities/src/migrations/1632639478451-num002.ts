import {MigrationInterface, QueryRunner} from "typeorm";

export class num0021632639478451 implements MigrationInterface {
    name = 'num0021632639478451'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."photo" DROP CONSTRAINT "FK_4494006ff358f754d07df5ccc87"`);
        await queryRunner.query(`ALTER TABLE "public"."invites" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "public"."invites" ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "public"."direct_message_info" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "public"."direct_message_info" ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "public"."direct_message_info" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "public"."direct_message_info" ADD "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "public"."direct_messages" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "public"."direct_messages" ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "public"."friends" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "public"."friends" ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "public"."chatmember" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "public"."chatmember" ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "public"."chats" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "public"."chats" ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "public"."chats" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "public"."chats" ADD "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "public"."games" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "public"."games" ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "public"."games" DROP COLUMN "started_at"`);
        await queryRunner.query(`ALTER TABLE "public"."games" ADD "started_at" TIMESTAMP WITH TIME ZONE`);
        await queryRunner.query(`ALTER TABLE "public"."games" DROP COLUMN "finished_at"`);
        await queryRunner.query(`ALTER TABLE "public"."games" ADD "finished_at" TIMESTAMP WITH TIME ZONE`);
        await queryRunner.query(`ALTER TABLE "public"."games" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "public"."games" ADD "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "public"."chat_messages" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "public"."chat_messages" ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "public"."photo" ADD CONSTRAINT "FK_4494006ff358f754d07df5ccc87" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."photo" DROP CONSTRAINT "FK_4494006ff358f754d07df5ccc87"`);
        await queryRunner.query(`ALTER TABLE "public"."chat_messages" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "public"."chat_messages" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "public"."games" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "public"."games" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "public"."games" DROP COLUMN "finished_at"`);
        await queryRunner.query(`ALTER TABLE "public"."games" ADD "finished_at" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "public"."games" DROP COLUMN "started_at"`);
        await queryRunner.query(`ALTER TABLE "public"."games" ADD "started_at" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "public"."games" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "public"."games" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "public"."chats" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "public"."chats" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "public"."chats" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "public"."chats" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "public"."chatmember" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "public"."chatmember" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "public"."friends" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "public"."friends" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "public"."direct_messages" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "public"."direct_messages" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "public"."direct_message_info" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "public"."direct_message_info" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "public"."direct_message_info" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "public"."direct_message_info" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "public"."invites" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "public"."invites" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "public"."photo" ADD CONSTRAINT "FK_4494006ff358f754d07df5ccc87" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
