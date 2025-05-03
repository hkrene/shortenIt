// import type { HttpContext } from '@adonisjs/core/http'
// import QRCode from 'qrcode'
// import Url from '#models/url'
// // import { urlMap } from './short_urls_controller.ts'
// // import { create } from 'domain'

// export default class QrCodesController {
  

//    public async generate({ params, request, response, auth }:HttpContext) {
//         const code = params.code
  
//         const shortUrl = `${request.protocol()}://${request.host()}/${code}`
//         const qrCode = await QRCode.toBuffer(shortUrl)
  
//         const users = auth.user
//         const qrCodeEntry = await Url.create({
//          qr_code: qrCode,
//          user_id: users?.id
//         })
      
//         response.type('image/png')
//         return response.send(qrCode)
//       }
// }

// public async generate({ params, request, response, auth }) {
  //   // const code = params.code


  //   // const shortUrl = `${request.protocol()}://${request.host()}/${code}`
  //   // const qrBuffer = await QRCode.toBuffer(shortUrl)

  //   // // const users = auth.user
  //   // // const qrCode = await create({
  //   // //   qrCode: qrBuffer
  //   // // })

  //   // response.type('image/png')
  //   // return response.send(qrBuffer)
  // }