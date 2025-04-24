import vine from '@vinejs/vine'
export const createUserValidator = vine.compile(
  vine.object({
    fullName: vine.string().trim().minLength(4).maxLength(25),
    email: vine.string().trim().maxLength(50).email(),
    password: vine.string().minLength(8).maxLength(20),
  })
)