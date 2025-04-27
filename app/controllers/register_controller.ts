import { HttpContext } from '@adonisjs/core/http'
import {createUserValidator} from '#validators/user'
import User from '#models/user'

export default class UserController {

 public async store({ view, request, response }: HttpContext) {
    const payload = await request.validateUsing(createUserValidator)
    return view.render('pages/url_list')
  }
}