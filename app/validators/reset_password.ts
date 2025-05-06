import vine from '@vinejs/vine'
// validators/auth.ts
import { schema } from '@adonisjs/core/validator'

export const resetPasswordValidator = schema.create({
  token: schema.string(),
  email: schema.string([rules.email()]),
  password: schema.string([rules.confirmed(), rules.minLength(8)])
})