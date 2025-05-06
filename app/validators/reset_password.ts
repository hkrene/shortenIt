// validators/reset_password_validator.ts
import vine from '@vinejs/vine'

export const resetPasswordValidator = vine.compile(
  vine.object({
    email: vine.string().email(),
    token: vine.string(),
    password: vine.string().minLength(8).confirmed(),
  })
)
