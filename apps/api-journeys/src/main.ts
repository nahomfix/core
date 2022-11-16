import { NestFactory } from '@nestjs/core'
import { AppModule } from './app/app.module'

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule, { logger: false })
  await app.listen(process.env.PORT ?? '4001')
}

bootstrap().catch((err) => console.log(err))
