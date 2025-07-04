/**import { HttpContext } from '@adonisjs/core/http'
import {createUserValidator} from '#validators/user'
import User from '#models/user'
import mail from '@adonisjs/mail/services/main'

export default class UserController {

  public async showLoginForm({ view }: HttpContext) {
    return view.render('pages/login')
  }

  public async showSigninForm({ view }: HttpContext) {
    return view.render('pages/signin')
  }

  public async store({ request, response}:HttpContext) {
      const payload = await request.validateUsing(createUserValidator)
      
      const user = await User.create({
        full_name: payload.full_name,
        email: payload.email,
        password: payload.password
      })
      console.log(user);

      await mail.send((message) => {
        message
          .to(user.email)
          .from('shortenitapp@gmail.com')
          .subject('Verify your email address')
          .htmlView('pages/signup_mail', { user })
      })

      return response.redirect('/list')
    }


  public async login({ request, response, auth, session }: HttpContext) {
    try {
      const { email, password } = request.only(['email', 'password'])

      const user = await User.verifyCredentials(email, password)
      
      await auth.use('web').login(user)
      session.flash('success', 'Login successful')
      return response.redirect('/list')
    } 
    catch (error) {
      session.flash('notification', {
        type: 'error',
        message: error.message || 'An error occurred. Please try again.',
      })
      return response.redirect().back()
    }
  }

  public async logout({ auth, response }: HttpContext) {
    await auth.use('web').logout()
    return response.redirect('/login') 
  }
  

  public async showForgotForm({view}:HttpContext){
    return view.render('pages/forgot_password')
  }
  
  public async forgot({ response }:HttpContext){
    return response.redirect('/login')
  }
  
}**/


import { HttpContext } from '@adonisjs/core/http'
import { createUserValidator } from '#validators/user'
import User from '#models/user'
import mail from '@adonisjs/mail/services/main'

export default class UserController {
  public async store({ request, response }: HttpContext) {
    const payload = await request.validateUsing(createUserValidator)

    const user = await User.create({
      full_name: payload.full_name,
      email: payload.email,
      password: payload.password,
    })

    await mail.send((message) => {
      message
        .to(user.email)
        .from('shortenitapp@gmail.com')
        .subject('Verify your email address')
        .htmlView('pages/signup_mail', { user })
    })

    return response.json({
      success: true,
      message: 'User created successfully. Verification email sent.',
      data: user,
    })
  }

  public async login({ request, response, auth }: HttpContext) {
    try {
      const { email, password } = request.only(['email', 'password'])

      const user = await User.verifyCredentials(email, password)
      await auth.use('web').login(user)

      return response.json({
        success: true,
        message: 'Login successful',
        data: user,
      })
    } catch (error) {
      return response.status(401).json({
        success: false,
        message: error.message || 'Invalid credentials. Please try again.',
      })
    }
  }

  public async logout({ auth, response }: HttpContext) {
    await auth.use('web').logout()
    return response.json({
      success: true,
      message: 'Logout successful',
    })
  }

  public async showForgotForm({ response }: HttpContext) {
    return response.json({
      success: true,
      message: 'Forgot password endpoint reached',
    })
  }

  public async forgot({ response }: HttpContext) {
    return response.json({
      success: true,
      message: 'Password reset functionality not implemented yet',
    })
  }
}

