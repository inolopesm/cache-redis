import { NextFunction, Request, Response } from 'express'
import { RedisHelper } from '../cache/redis-helper'
import { KnexHelper } from '../database/knex-helper'
import { User } from '../entities/user'

export class UserController {
  async show(request: Request, response: Response, next: NextFunction) {
    try {
      if (request.headers['x-access-token'] === undefined) {
        response.status(400)
        response.send({ message: 'missing parameter: \'x-access-token\'' })
        return
      }

      if (typeof request.headers['x-access-token'] !== 'string') {
        response.status(400)
        response.send({ message: 'invalid parameter: \'x-access-token\'' })
        return
      }

      const accessToken = request.headers['x-access-token']

      const cachedUserText = await RedisHelper
        .getInstance()
        .get(accessToken)

      if (cachedUserText) {
        response.status(200)
        response.send(JSON.parse(cachedUserText))
        return
      }

      const [user] = await KnexHelper
        .getInstance()
        .getTable<User>('User')
        .select()
        .where({ accessToken })

      if (!user) {
        response.status(400)
        response.send({ message: 'unauthorized' })
        return
      }

      await RedisHelper.getInstance().set(accessToken, JSON.stringify(user))

      response.status(200)
      response.send(user)
    } catch (error) {
      response.status(500)
      response.send({ message: 'an internal error has occurred' })
      if (error instanceof Error) console.error(error.message)
    }
  }
}
