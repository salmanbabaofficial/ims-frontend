export interface ServerResponse<T> {
  isError: boolean;
  message: string;
  code: number;
  count: number;
  data: T[];
}

export interface ServerResponseObj<T> extends Omit<ServerResponse<T>, 'data'> {
  data: T;
}
