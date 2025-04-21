// import type { HttpContext } from '@adonisjs/core/http'

import { nanoid } from 'nanoid'
import Url from '#models/url'

export const urlMap = new Map<string, string>()

export default class ShortUrlsController {
  public async index({ view }) {
    return view.render('pages/home')
  }

  public async create({ request, view, response }) {
    const originalUrl = request.input('url')

    const code = nanoid(6)
    urlMap.set(code, originalUrl)

    return view.render('pages/result', {
      shortUrl: `${request.protocol()}://${request.host()}/${code}`,
      code,
    })
  }

  public async redirect({ params, response }) {
    const original = urlMap.get(params.code)
    return response.redirect(original)
  }
}
