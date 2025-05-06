import { HttpContext } from '@adonisjs/core/http'
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
    const { email, token, password } = await request.validateUsing(resetPasswordValidator)

    const reset = await PasswordResetToken
      .query()
      .where('email', email)
      .andWhere('token', token)
      .first()
      console.log(reset);
      

    if (!reset || reset.expiresAt < DateTime.now()) {
      return response.badRequest({ message: 'Token invalide ou expiré.' })
    }

    const user = await User.findBy('email', email)
    if (!user) return response.badRequest({ message: 'Utilisateur non trouvé.' })

    user.password = password
    await user.save()

    await reset.delete()

    return response.ok({ message: 'Mot de passe réinitialisé avec succès.' })
  }
}
