import { Module } from '@nestjs/common'
import { DatabaseModule } from '@core/nest/database/DatabaseModule'
import { ArclightVariantResolver } from './arclightVariant.resolver'

@Module({
  imports: [DatabaseModule],
  providers: [ArclightVariantResolver],
  exports: [ArclightVariantResolver]
})
export class ArclightVariantModule {}
