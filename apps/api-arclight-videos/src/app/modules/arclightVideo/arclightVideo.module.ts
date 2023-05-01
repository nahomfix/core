import { Module, CacheModule } from '@nestjs/common'
import { DatabaseModule } from '@core/nest/database/DatabaseModule'
import { PrismaModule } from '../prisma/prisma.module'
import {
  ArclightVideoResolver,
  LanguageWithSlugResolver
} from './arclightVideo.resolver'

@Module({
  imports: [DatabaseModule, CacheModule.register(), PrismaModule],
  providers: [ArclightVideoResolver, LanguageWithSlugResolver],
  exports: []
})
export class ArclightVideoModule {}
