import Redis, { Redis as IRedis } from 'ioredis'
import { promisify } from 'util'

export class RedisHelper {
  private static instance: RedisHelper | null = null

  static getInstance(): RedisHelper {
    if (RedisHelper.instance === null) {
      RedisHelper.instance = new RedisHelper()
    }

    return RedisHelper.instance
  }

  private constructor() {}

  redis: IRedis | null = null

  async connect(): Promise<void> {
    this.redis = new Redis()
  }

  async disconnect(): Promise<void> {
    if (this.redis === null) {
      throw new Error('redis client is not connected')
    }

    this.redis.disconnect()
    this.redis = null
  }

  async get(key: string): Promise<string | null> {
    if (this.redis === null) {
      throw new Error('redis client is not connected')
    }

    return await this.redis.get(key)
  }

  async set(key: string, value: string): Promise<void> {
    if (this.redis === null) {
      throw new Error('redis client is not connected')
    }

    await this.redis.set(key, value)
  }
}
