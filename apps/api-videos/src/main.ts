import { NestFactory } from '@nestjs/core'
import { json } from 'body-parser'
import { AppModule } from './app/app.module'

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule, { logger: false })
  await app.use(json({ limit: '50mb' }))
  const port = process.env.PORT ?? '4004'
  await app.listen(port)
  console.log(`🚀 Server listening on port`, port)
}

void bootstrap()
