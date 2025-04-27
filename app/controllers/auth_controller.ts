// import User from '#models/user'
// import { createUserValidator } from '#validators/user'
// import type { HttpContext } from '@adonisjs/core/http'

// export default class AuthController {
//   public async loginPage({view}: HttpContext) {
//     return view.render()
//   }
// }

import User from '#models/user'
// import hash from '@adonisjs/core/services/hash'
import type { HttpContext } from '@adonisjs/core/http'

export default class SessionController {
  public  async store({ request }: HttpContext) {
    const { email, password } = request.only(['email', 'password'])

    const user = await User.verifyCredentials(email, password)
  }
}
