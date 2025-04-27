import vine from '@vinejs/vine'
export const createUserValidator = vine.compile(
  vine.object({
    full_name: vine.string().trim().minLength(4).maxLength(25),
    email: vine.string().trim().maxLength(50).email(),
    password: vine.string().minLength(8).maxLength(20),
  })
)