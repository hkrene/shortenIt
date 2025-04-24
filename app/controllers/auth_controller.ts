import User from '#models/user'
import { createUserValidator } from '#validators/user'
import type { HttpContext } from '@adonisjs/core/http'

export default class AuthController {
  public async loginPage({view}: HttpContext) {
    return view.render()
  }
}