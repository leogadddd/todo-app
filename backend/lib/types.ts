export interface DatabaseAdapter {
  create: <T>(table: string, data: T) => Promise<T>;
  read: <T>(table: string, where?: Record<string, any>) => Promise<T[]>;
  update: <T>(
    table: string,
    data: T,
    where: Record<string, any>
  ) => Promise<T[]>;
  remove: <T>(table: string, where: Record<string, any>) => Promise<T[]>;
}

export interface TodoType {
  id: number;
  title: string;
  completed: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface UserType {
  id: number;
  username: string;
  password: string;
  created_at: Date;
  updated_at: Date;
}

export type APIResponse = {
  status: number;
  message: string;
  data: {
    todo?: TodoType;
    todos?: TodoType[];
    id?: string;
    len: number;
    username?: string;
    auth?: boolean;
    token?: string;
  };
};

export type JWTPayload = {
  id: string;
  username: string;
  iat: number;
  exp: number;
};
