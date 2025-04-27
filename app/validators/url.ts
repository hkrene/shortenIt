import vine from '@vinejs/vine'
export const createUrlValidator = vine.compile(
  vine.object({
    url: vine.string().trim().maxLength(50).url()
  })
)
