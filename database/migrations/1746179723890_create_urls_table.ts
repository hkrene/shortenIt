import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'urls'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('qr_code')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}