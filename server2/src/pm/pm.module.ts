import { Module } from '@nestjs/common';
import { MailerModule } from 'src/integrations/mailer/mailer.module';
import { PmController } from './pm.controller';
import { PmService } from './pm.service';
import * as path from 'path';

@Module({
  imports: [
    MailerModule.forFeature({
      templateDir: path.join('src', 'pm', 'templates'),
    }),
  ],
  controllers: [PmController],
  providers: [PmService],
})
export class PmModule {}
