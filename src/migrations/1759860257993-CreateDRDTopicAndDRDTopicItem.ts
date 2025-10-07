import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateDRDTopicAndDRDTopicItem1759860257993 implements MigrationInterface {
    name = 'CreateDRDTopicAndDRDTopicItem1759860257993'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`drd_topic_items\` (\`id\` int NOT NULL AUTO_INCREMENT, \`uuid\` varchar(255) NOT NULL, \`created_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updated_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, \`drd_topic_id\` int NOT NULL, \`name\` varchar(255) NOT NULL, \`description\` text NULL, UNIQUE INDEX \`IDX_276de0b4fbdece09da5e8d3959\` (\`uuid\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`drd_topics\` (\`id\` int NOT NULL AUTO_INCREMENT, \`uuid\` varchar(255) NOT NULL, \`created_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updated_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, \`drd_id\` int NOT NULL, \`name\` varchar(150) NOT NULL, \`description\` text NULL, UNIQUE INDEX \`IDX_7172db41c93bdb7c5230ed8d56\` (\`uuid\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`drd_topic_items\` ADD CONSTRAINT \`FK_a81e62cc518ae29b4eda0b46d0d\` FOREIGN KEY (\`drd_topic_id\`) REFERENCES \`drd_topics\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`drd_topics\` ADD CONSTRAINT \`FK_feda604825238b0899bf0e8eaeb\` FOREIGN KEY (\`drd_id\`) REFERENCES \`drds\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`drd_topics\` DROP FOREIGN KEY \`FK_feda604825238b0899bf0e8eaeb\``);
        await queryRunner.query(`ALTER TABLE \`drd_topic_items\` DROP FOREIGN KEY \`FK_a81e62cc518ae29b4eda0b46d0d\``);
        await queryRunner.query(`DROP INDEX \`IDX_7172db41c93bdb7c5230ed8d56\` ON \`drd_topics\``);
        await queryRunner.query(`DROP TABLE \`drd_topics\``);
        await queryRunner.query(`DROP INDEX \`IDX_276de0b4fbdece09da5e8d3959\` ON \`drd_topic_items\``);
        await queryRunner.query(`DROP TABLE \`drd_topic_items\``);
    }

}
