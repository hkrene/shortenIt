import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'

export default class UsersController {
  public async userProfile({ request }: HttpContext) {
    const data = request.all()
    const payload = await createUserValidator.validate(data)
    return payload
  }
  

}