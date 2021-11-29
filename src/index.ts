import { App } from './app'
import { RedisHelper } from './cache/redis-helper'
import { Constants } from './constants'
import { KnexHelper } from './database/knex-helper'

async function main() {
  Constants.configureDotenv()
  await KnexHelper.getInstance().connect(Constants.getDatabaseUrl())
  await RedisHelper.getInstance().connect()
  new App().listen(Constants.getPort())
}

main()
