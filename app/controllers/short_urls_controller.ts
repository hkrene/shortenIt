import type { HttpContext } from '@adonisjs/core/http'

import { nanoid } from 'nanoid'
import Url from '#models/url'
import { createUrlValidator } from '#validators/url'
import QRCode from 'qrcode'


export default class ShortUrlsController {
  public async index({ view, auth }: HttpContext) {
    const lists = await Url.findManyBy('user_id', auth.user?.id)
    return view.render('pages/url_list', { lists })
  }

  public async listUrl({ view, auth }: HttpContext) {
    const lists = await Url.findManyBy('user_id', auth.user?.id)
    return view.render('pages/url_list', { lists })
  }

  public async create({ request, view, auth }: HttpContext) {
    const { url } = await request.validateUsing(createUrlValidator)

    const code = nanoid(6)
    const shortUrl = `${request.protocol()}://${request.host()}/${code}`
    const qrCode = await QRCode.toDataURL(shortUrl)

    const user = auth.user

    await Url.create({
      code,
      short_url: shortUrl,
      original_url: url,
      qr_code: qrCode,
      user_id: user?.id,
    })

    return view.render('pages/result', {
      shortUrl,
      code,
      qrCode,
    })
  }

  public async redirect({ params, response }) {
    const record = await Url.findBy('code', params.code)
    // console.log(record);
    

    return response.redirect(record.original_url)
  }

  public async submit({view}){
    return view.render('pages/home')
  }
  public async delete({params, response}){
    const url = await Url.findOrFail(params.id)
    await url.delete()

    return response.redirect().back()
  }

  public async edit({view, params, request, response}){
    const url = await Url.findOrFail(params.id)
    return view.render('pages/edit', {url})
  }

  public async update({params, request,view, response, auth}:HttpContext){
    const url = await Url.findOrFail(params.id)
    
    url.original_url = request.input('url')
    await url.save()
    // const lists= await Url.all()
    const lists = await Url.findManyBy('user_id', auth.user?.id)

    return view.render('pages/url_list', {lists})
  }




}

