/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import ShortUrlsController from '#controllers/short_urls_controller'
import QrCodesController from '#controllers/qr_codes_controller'
import UserController from '#controllers/register_controller'

router.get('/', [ShortUrlsController, 'index'])


router.group(() => {
  router.get('/login', [UserController, 'createUser'])
  router.get('/signin', [ShortUrlsController, 'signin'])
  router.get('/list', [ShortUrlsController, 'listUrl'])
  router.get('/home', '#controllers/short_urls_controller.submit')
  router.get('pages/url_list','#controllers/short_urls_controller.listUrl')
  router.post('/shorten', [ShortUrlsController, 'create'])
  router.get('/:code', [ShortUrlsController, 'redirect'])
  router.get('/qr/:code', [QrCodesController, 'generate'])
  router.get('/delete/:id', '#controllers/short_urls_controller.delete')
  router.get('/edit/:id', '#controllers/short_urls_controller.edit')
  router.post('/update/:id','#controllers/short_urls_controller.update' )
})


