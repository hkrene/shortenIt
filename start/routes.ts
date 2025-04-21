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

router.get('/', [ShortUrlsController, 'index'])
router.get('/list', '#resources/views/pages/url_list.submit')
router.post('/shorten', [ShortUrlsController, 'create'])
router.get('/:code', [ShortUrlsController, 'redirect'])
router.get('/qr/:code', [QrCodesController, 'generate'])



