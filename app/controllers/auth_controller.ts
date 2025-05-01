// app/controllers/auth_controller.ts
import { HttpContext } from '@adonisjs/core/http'
import { createUserValidator } from '#validators/user' // Keep this if needed for registration
import User from '#models/user'
import mail from '@adonisjs/mail/services/main'
import Auth from '@adonisjs/auth/main'
import { resetPasswordValidator } from '#validators/auth' // We'll create this next

export default class AuthController {
  // Forgot Password Form
  async showForgotPasswordForm({ view }: HttpContext) {
    return view.render('auth/forgot_password')
  }

  // Send Password Reset Email
  async sendResetLink({ request, response, session }: HttpContext) {
    const email = request.input('email')
    const user = await User.findBy('email', email)

    if (user) {
      const { token } = await Auth.generatePasswordResetToken(user)
      
      await mail.send((message) => {
        message
          .from('no-reply@example.com')
          .to(user.email)
          .subject('Password Reset Request')
          .htmlView('emails/password_reset', {
            resetUrl: `/reset-password/${token}`
          })
      })
    }

    session.flash('success', 'If the email exists, a reset link has been sent')
    return response.redirect().back()
  }

  // Reset Password Form
  async showResetForm({ view, params }: HttpContext) {
    return view.render('auth/reset_password', { token: params.token })
  }

  // Handle Password Reset
  async resetPassword({ request, response, session }: HttpContext) {
    const data = await request.validateUsing(resetPasswordValidator)
    
    try {
      const user = await Auth.verifyPasswordResetToken(data.token)
      
      if (user.email !== data.email) {
        throw new Error('Email mismatch')
      }

      user.password = data.password
      await user.save()

      await Auth.invalidatePasswordResetToken(data.token)

      session.flash('success', 'Password reset successfully!')
      return response.redirect().toRoute('login')
    } catch (error) {
      session.flash('error', 'Invalid or expired reset token')
      return response.redirect().back()
    }
  }
}