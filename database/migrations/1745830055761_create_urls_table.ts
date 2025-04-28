import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'urls'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.integer('user_id')
    })
  }

}