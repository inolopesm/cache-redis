import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('User', table => {
    table.string('id', 36).primary()
    table.string('name', 255).notNullable()
    table.string('email', 255).notNullable().unique()
    table.string('password', 255).notNullable()
    table.datetime('createdAt', { useTz: true }).notNullable()
    table.datetime('updatedAt', { useTz: true }).notNullable()
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('User')
}
