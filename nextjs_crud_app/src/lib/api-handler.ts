import { connectDB } from '@/lib/db';
import { errorResponse } from './response';
import { STATUS, MESSAGES } from './constants';

export const apiHandler = (handler: (req: Request) => Promise<Response>) => {
  return async (req: Request): Promise<Response> => {
    try {
      await connectDB();
      return await handler(req);
    } catch (err: any) {
      console.error('API Error:', err);
      return errorResponse(MESSAGES.SERVER_ERROR, STATUS.INTERNAL_ERROR);
    }
  };
};
