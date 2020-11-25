import { Inject, Injectable, Scope } from '@nestjs/common';
import { TEMPLATE_RENDERER_OPTIONS } from './template-renderer.constants';
import path from 'path';
import ejs from 'ejs';
import { ITemplateRendererOptions } from './interfaces/template-renderer-options.interface';

@Injectable({ scope: Scope.TRANSIENT })
export class TemplateRedererService {
  workingDir = process.cwd();
  templatesDir = path.join(this.workingDir, this.options.templateDir);
  constructor(
    @Inject(TEMPLATE_RENDERER_OPTIONS)
    private options: ITemplateRendererOptions,
  ) {}

  async render(filename: string, data?: any) {
    const filePath = path.join(this.templatesDir, filename);
    return ejs.renderFile(filePath, data, {
      root: this.templatesDir,
    });
  }
}
