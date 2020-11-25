import { DynamicModule, Module } from '@nestjs/common';
import { TEMPLATE_RENDERER_OPTIONS } from './template-renderer.constants';
import { TemplateRedererService } from './template-renderer.service';
import { ITemplateRendererOptions } from './interfaces/template-renderer-options.interface';

@Module({
  providers: [TemplateRedererService],
  exports: [TemplateRedererService],
})
export class TemplateRendererModule {
  static register(options: ITemplateRendererOptions): DynamicModule {
    return {
      module: TemplateRendererModule,
      providers: [
        {
          provide: TEMPLATE_RENDERER_OPTIONS,
          useValue: options,
        },
      ],
    };
  }
}
