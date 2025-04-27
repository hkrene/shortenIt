import { HttpContext } from '@adonisjs/core/http'
import {createUserValidator} from '#validators/user'
import User from '#models/user'


export default class UserController {

  public async store({ view, request}:HttpContext) {
      const payload = await request.validateUsing(createUserValidator)
      
      const user = await User.create({
        full_name: payload.full_name,
        email: payload.email,
        password: payload.password
      })
      console.log(user);

      return view.render('pages/url_list')
    }


  public async login({ view }: HttpContext) {
    return view.render('pages/login')
  }

  public async showLoginForm({ view }: HttpContext) {
    return view.render('pages/login')
  }

  public async showSigninForm({ view }: HttpContext) {
    return view.render('pages/signin')
  }
  
  
}