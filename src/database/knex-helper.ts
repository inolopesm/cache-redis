import Knex, { Knex as IKnex } from 'knex'

export class KnexHelper {
  private static instance: KnexHelper | null = null

  static getInstance(): KnexHelper {
    if (KnexHelper.instance === null) {
      KnexHelper.instance = new KnexHelper()
    }

    return KnexHelper.instance
  }

  private constructor() {}

  private knex: IKnex | null = null

  async connect(uri: string): Promise<void> {
    this.knex = Knex({ client: 'pg', connection: uri })
  }

  async disconnect() {
    if (this.knex === null) {
      throw new Error('knex client is not connected')
    }

    await this.knex.destroy()
    this.knex = null
  }

  getTable<T>(name: string) {
    if (this.knex === null) {
      throw new Error('knex client is not connected')
    }

    return this.knex<T>(name)
  }
}
