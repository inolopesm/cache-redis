import express, { json as bodyParser, Express } from 'express'
import morgan from 'morgan'
import { Routes } from './routes'

export class App {
  private readonly app: Express

  constructor() {
    this.app = express()
    this.setupMiddlewares()
    this.setupRoutes()
  }

  private setupMiddlewares(): void {
    this.app.use(bodyParser())
    this.app.use(morgan('dev'))
  }

  private setupRoutes(): void {
    Routes.setup(this.app)
  }

  listen(port: number): void {
    this.app.listen(port)
  }
}
