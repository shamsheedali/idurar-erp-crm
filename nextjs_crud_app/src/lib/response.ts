type ResponseData<T = any> = {
  success: boolean;
  message: string;
  data?: T;
};

export const successResponse = <T>(data: T, message = 'Success', status = 200) => {
  return new Response(JSON.stringify({ success: true, message, data } as ResponseData<T>), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
};

export const errorResponse = (message = 'Internal Server Error', status = 500, errors?: any) => {
  return new Response(JSON.stringify({ success: false, message, errors } as ResponseData), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
};
