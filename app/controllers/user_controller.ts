import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'

export default class UserController {
  public async createUser({ request, view, response }) {
    const email = request.input('email')
    const password = request.input('password')

    const user = await User.create({
      email: email,
      password: password
    })
    return view.render('pages/url_list')
  }
  

}