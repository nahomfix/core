import { Global, Module } from '@nestjs/common'
import { DatabaseModule } from '@core/nest/database/DatabaseModule'
import { EventService } from '../event/event.service'
import { VisitorService } from './visitor.service'
import { VisitorResolver } from './visitor.resolver'

@Global()
@Module({
  imports: [DatabaseModule],
  providers: [VisitorService, VisitorResolver, EventService],
  exports: [VisitorService]
})
export class VisitorModule {}
