import { HttpContext } from '@adonisjs/core/http'
import {createUserValidator} from '#validators/user'
import User from '#models/user'

export default class UserController {

 public async store({ view, request, response }: HttpContext) {
    const payload = await request.validateUsing(createUserValidator)
    
    const user = await User.create({
      fullName: payload.fullName,
      email: payload.email,
      password: payload.password,
    })
    
    console.log(payload);

    return view.render('pages/url_list')
  }
  public async login({ view }: HttpContext) {
    return view.render('pages/login')
  }
}