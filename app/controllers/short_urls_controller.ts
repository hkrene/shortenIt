import type { HttpContext } from '@adonisjs/core/http'

import { nanoid } from 'nanoid'
import Url from '#models/url'
import { createUrlValidator } from '#validators/url'

export const urlMap = new Map<string, string>()

export default class ShortUrlsController {
  public async index({ view, auth }: HttpContext) {
    const lists = await Url.findManyBy('user_id', auth.user?.id)
    return view.render('pages/url_list', { lists })
  }

  

  public async listUrl({view, auth}:HttpContext){
    const lists = await Url.findManyBy('user_id', auth.user?.id)
    return view.render('pages/url_list', {lists})
  }


  public async create({ request, view, response, auth }:HttpContext) {
    const { url } = await request.validateUsing(createUrlValidator)
  
    const code = nanoid(6)
    urlMap.set(code, url)
    const shortUrl = `${request.protocol()}://${request.host()}/${code}`
    console.log(shortUrl);
  
    const users = auth.user
    const urlEntry = await Url.create({
      code: code,
      short_url: shortUrl,
      original_url: url,
      user_id: users?.id
    })
    
    return view.render('pages/result', {
      shortUrl,
      code,
    })
  }
  

  public async redirect({ params, response }) {
    const original = urlMap.get(params.code)
    return response.redirect(original)
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

