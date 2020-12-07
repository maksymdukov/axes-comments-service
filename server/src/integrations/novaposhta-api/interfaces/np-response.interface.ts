export interface NpResponse<T = any> {
  success: boolean;
  data: T[];
  errors: string[];
  warnings: [];
  info: {
    totalCount: string;
  };
  messageCodes: [];
  errorCodes: [];
  warningCodes: [];
  infoCodes: [];
}
