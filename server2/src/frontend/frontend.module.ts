import { Module } from '@nestjs/common';
import { FrontendService } from './frontend.service';
import { FrontendController } from './frontend-admin.controller';
import { SsgModule } from 'src/integrations/ssg/ssg.module';

@Module({
  imports: [SsgModule.forFeature()],
  providers: [FrontendService],
  controllers: [FrontendController],
})
export class FrontendModule {}
