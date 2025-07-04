/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

/**import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

import ShortUrlsController from '#controllers/short_urls_controller'
// import QrCodesController from '#controllers/qr_codes_controller'
import UserController from '#controllers/user_controller'
import AuthController from '#controllers/auth_controller'


router.on('/').render('pages/login')
// router.get('/', [ShortUrlsController, 'index'])

router.get('/login', [UserController, 'showLoginForm'])
router.get('/signin', [UserController, 'showSigninForm'])
router.post('/loginUser', [UserController, 'login'])
router.post('/signin', [UserController, 'store'])
router.get('/forgot', [UserController, 'showForgotForm'])
// router.post('/forgot-password', [UserController, 'forgot'])

router.post('/forgot-password', [AuthController, 'forgotPassword'])
router.get('/reset-password', [AuthController, 'showResetForm'])
router.post('/reset-password', [AuthController, 'resetPassword'])





router.group(() => {
  
  router.get('/list', [ShortUrlsController, 'listUrl'])
  router.get('/home', '#controllers/short_urls_controller.submit')
  router.get('pages/url_list','#controllers/short_urls_controller.listUrl')
  router.post('/shorten', [ShortUrlsController, 'create'])
  router.get('/:code', [ShortUrlsController, 'redirect'])
  // router.get('/qr/:code', [ShortUrlsController, 'create'])
  router.get('/delete/:id', '#controllers/short_urls_controller.delete')
  router.get('/edit/:id', '#controllers/short_urls_controller.edit')
  router.post('/update/:id','#controllers/short_urls_controller.update' )
  router.post('/logout', [UserController, 'logout'])
}) .use(middleware.auth())**/



import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

import ShortUrlsController from '#controllers/short_urls_controller'
import UserController from '#controllers/user_controller'
import AuthController from '#controllers/auth_controller'

// Public routes
router.post('/signin', [UserController, 'store']) 
router.post('/login', [UserController, 'login']) 
router.post('/forgot-password', [AuthController, 'forgotPassword']) 
router.post('/reset-password', [AuthController, 'resetPassword']) 

// Protected routes (require authentication)
router.group(() => {
  router.get('/list', [ShortUrlsController, 'listUrl']) 
  router.post('/shorten', [ShortUrlsController, 'create']) 
  router.get('/:code', [ShortUrlsController, 'redirect']) 
  router.delete('/delete/:id', [ShortUrlsController, 'delete']) 
  router.get('/edit/:id', [ShortUrlsController, 'edit']) 
  router.put('/update/:id', [ShortUrlsController, 'update'])
  router.post('/logout', [UserController, 'logout']) 
}).use(middleware.auth()) 