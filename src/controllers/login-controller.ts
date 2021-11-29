import { randomUUID } from 'crypto'
import { NextFunction, Request, Response } from 'express'
import { KnexHelper } from '../database/knex-helper'
import { User } from '../entities/user'

export class LoginController {
  async signUp(request: Request, response: Response, next: NextFunction): Promise<void> {
    try {
      for (const parameter of ['name', 'email', 'password']) {
        if (request.body[parameter] === undefined) {
          response.status(400)
          response.send({ message: `missing parameter: ${parameter}` })
          return
        }

        if (typeof request.body[parameter] !== 'string') {
          response.status(400)
          response.send({ message: `invalid parameter: ${parameter}` })
          return
        }
      }

      const { name, email, password } = request.body as Record<string, string>

      const [userAlreadyExists] = await KnexHelper
        .getInstance()
        .getTable<User>('User')
        .select()
        .where({ email })

      if (userAlreadyExists) {
        response.status(400)
        response.send({ message: 'user already exists with this email' })
        return
      }

      await KnexHelper.getInstance()
        .getTable<User>('User')
        .insert({
          id: randomUUID(),
          name: name,
          email: email,
          password: password,
          createdAt: new Date(),
          updatedAt: new Date(),
          accessToken: null
        })

      response.status(200)
      response.end()
    } catch (error) {
      response.status(500)
      response.send({ message: 'an internal error has occurred' })
      if (error instanceof Error) console.error(error.message)
    }
  }

  async logIn(request: Request, response: Response, next: NextFunction): Promise<void> {
    try {
      for (const parameter of ['email', 'password']) {
        if (request.body[parameter] === undefined) {
          response.status(400)
          response.send({ message: `missing parameter: ${parameter}` })
          return
        }

        if (typeof request.body[parameter] !== 'string') {
          response.status(400)
          response.send({ message: `invalid parameter: ${parameter}` })
          return
        }
      }

      const { email, password } = request.body as Record<string, string>

      const [user] = await KnexHelper
        .getInstance()
        .getTable<User>('User')
        .select()
        .where({ email, password })

      if (!user) {
        response.status(400)
        response.send({ message: 'invalid email and/or password' })
        return
      }

      const accessToken = randomUUID().replace(/-/g, '')

      await KnexHelper
        .getInstance()
        .getTable<User>('User')
        .update({ accessToken })
        .where({ id: user.id })

      response.status(200)
      response.send({ accessToken })
    } catch (error) {
      response.status(500)
      response.send({ message: 'an internal error has occurred' })
      if (error instanceof Error) console.error(error.message)
    }
  }
}
