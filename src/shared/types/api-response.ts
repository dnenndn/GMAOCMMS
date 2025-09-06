export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  code?: string;
  timestamp: Date;
  pagination?: {
      page: number;
      limit: number;
      total: number;
      pages: number;
  };
}

export class ResponseBuilder {
  static success<T>(data: T, message?: string): ApiResponse<T> {
      return {
          success: true,
          data,
          message,
          timestamp: new Date(),
      };
  }

  static error(error: Error, code?: string): ApiResponse {
      return {
          success: false,
          error: error.message,
          code: code || 'INTERNAL_ERROR',
          timestamp: new Date(),
      };
  }
}