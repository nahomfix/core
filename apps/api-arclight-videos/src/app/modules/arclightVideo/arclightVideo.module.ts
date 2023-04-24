import { Module, CacheModule } from '@nestjs/common'
import { DatabaseModule } from '@core/nest/database/DatabaseModule'
import {
  ArclightVideoResolver,
  LanguageWithSlugResolver
} from './arclightVideo.resolver'
import { ArclightVideoService } from './arclightVideo.service'

@Module({
  imports: [DatabaseModule, CacheModule.register()],
  providers: [
    ArclightVideoResolver,
    ArclightVideoService,
    LanguageWithSlugResolver
  ],
  exports: [ArclightVideoService]
})
export class ArclightVideoModule {}
