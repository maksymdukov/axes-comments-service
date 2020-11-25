export interface ISendEmailOptions {
  from?: string;
  to?: string;
  subject: string;
  templatePath: string;
  templateData: any;
}
