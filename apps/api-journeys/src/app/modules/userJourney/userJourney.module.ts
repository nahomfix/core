import { Global, Module } from '@nestjs/common'
import { PrismaService } from '../../lib/prisma.service'
import { JourneyService } from '../journey/journey.service'
import { UserJourneyService } from './userJourney.service'
import { UserJourneyResolver } from './userJourney.resolver'

@Global()
@Module({
  imports: [],
  providers: [
    UserJourneyService,
    UserJourneyResolver,
    JourneyService,
    PrismaService
  ],
  exports: [UserJourneyService]
})
export class UserJourneyModule {}
