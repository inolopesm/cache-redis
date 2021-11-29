import { Express, Router } from 'express'
import { LoginController } from './controllers/login-controller'
import { UserController } from './controllers/user-controller'

export class Routes {
  private readonly router: Router

  private constructor(app: Express) {
    this.router = Router()
    this.setupLogin()
    this.setupUser()
    app.use(this.router)
  }

  static setup(app: Express): void {
    new Routes(app)
  }

  setupLogin(): void {
    const loginController = new LoginController()
    this.router.post('/signup', loginController.signUp)
    this.router.post('/login', loginController.logIn)
  }

  setupUser(): void {
    const userController = new UserController()
    this.router.get('/users/me', userController.show)
  }
}
