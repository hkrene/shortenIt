/**import { HttpContext } from '@adonisjs/core/http'
import { randomBytes } from 'node:crypto'
import { DateTime } from 'luxon'
import User from '#models/user'
import PasswordResetToken from '#models/password_reset_token'
import { forgotPasswordValidator } from '#validators/forgot_password'
import { resetPasswordValidator } from '#validators/reset_password'
import mail from '@adonisjs/mail/services/main'

export default class AuthController {
  async forgotPassword({ request, response }) {
    const { email } = await request.validateUsing(forgotPasswordValidator)

    const user = await User.findBy('email', email)
    if (!user) return response.badRequest({ message: 'Utilisateur non trouvé.' })

    const token = randomBytes(32).toString('hex')
    const expiresAt = DateTime.now().plus({ hours: 2 })

    await PasswordResetToken.query().where('email', email).delete()

    await PasswordResetToken.create({ email, token, expiresAt })

    const resetLink = `${request.protocol()}://${request.host()}/reset-password?token=${token}&email=${email}`

    await mail.send((message) => {
      message
        .to(email)
        .from('shortenitapp@gmail.com')
        .subject('Réinitialisation de mot de passe')
        .html(`
          <p>Bonjour,</p>
          <p>Pour réinitialiser votre mot de passe, cliquez sur ce lien :</p>
          <a href="${resetLink}">${resetLink}</a>
          <p>Ce lien expirera dans 2 heures.</p>
        `)
    })

    return response.ok({ message: 'Lien de réinitialisation envoyé.' })
  }

  public async showResetForm({view}:HttpContext){
      return view.render('pages/change_password')
    }
    

  async resetPassword({ request, response }) {
    
  }
}**/

import { HttpContext } from '@adonisjs/core/http'
import { randomBytes } from 'node:crypto'
import { DateTime } from 'luxon'
import User from '#models/user'
import PasswordResetToken from '#models/password_reset_token'
import { forgotPasswordValidator } from '#validators/forgot_password'
import { resetPasswordValidator } from '#validators/reset_password'
import mail from '@adonisjs/mail/services/main'

export default class AuthController {
  public async forgotPassword({ request, response }: HttpContext) {
    const { email } = await request.validateUsing(forgotPasswordValidator)

    const user = await User.findBy('email', email)
    if (!user) {
      return response.badRequest({
        success: false,
        message: 'User not found.',
      })
    }

    const token = randomBytes(32).toString('hex')
    const expiresAt = DateTime.now().plus({ hours: 2 })

    await PasswordResetToken.query().where('email', email).delete()

    await PasswordResetToken.create({ email, token, expiresAt })

    const resetLink = `${request.protocol()}://${request.host()}/reset-password?token=${token}&email=${email}`

    await mail.send((message) => {
      message
        .to(email)
        .from('shortenitapp@gmail.com')
        .subject('Password Reset')
        .html(`
          <p>Hello,</p>
          <p>To reset your password, click the link below:</p>
          <a href="${resetLink}">${resetLink}</a>
          <p>This link will expire in 2 hours.</p>
        `)
    })

    return response.ok({
      success: true,
      message: 'Password reset link sent successfully.',
    })
  }

  public async resetPassword({ request, response }: HttpContext) {
    const { token, email, newPassword } = await request.validateUsing(resetPasswordValidator)

    const resetToken = await PasswordResetToken.query()
      .where('email', email)
      .andWhere('token', token)
      .andWhere('expiresAt', '>', DateTime.now().toSQL())
      .first()

    if (!resetToken) {
      return response.badRequest({
        success: false,
        message: 'Invalid or expired token.',
      })
    }

    const user = await User.findBy('email', email)
    if (!user) {
      return response.badRequest({
        success: false,
        message: 'User not found.',
      })
    }

    user.password = newPassword
    await user.save()

    await resetToken.delete()

    return response.ok({
      success: true,
      message: 'Password reset successfully.',
    })
  }
}
