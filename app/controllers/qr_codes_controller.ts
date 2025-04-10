// import type { HttpContext } from '@adonisjs/core/http'


import QRCode from 'qrcode'
import { urlMap } from './short_urls_controller.ts' // Import shared map

export default class QrCodesController {
  public async generate({ params, request, response }) {
    const code = params.code


    const shortUrl = `${request.protocol()}://${request.host()}/${code}`
    const qrBuffer = await QRCode.toBuffer(shortUrl)

    response.type('image/png')
    return response.send(qrBuffer)
  }
}