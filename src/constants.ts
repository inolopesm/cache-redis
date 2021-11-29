import dotenv from 'dotenv'
import env from 'env-var'

export class Constants {
  static configureDotenv(): void {
    dotenv.config()
  }

  static getDatabaseUrl(): string {
    return env.get('DATABASE_URL').required().asString()
  }

  static getPort(): number {
    return env.get('PORT').required().asPortNumber()
  }
}
