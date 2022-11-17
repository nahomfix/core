import { NestFactory } from '@nestjs/core'
import { AppModule } from './app/app.module'

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule, { logger: false })
  const port = process.env.PORT ?? '4003'
  await app.listen(port)
  console.log(`🚀 Server listening on port`, port)
}

void bootstrap()
