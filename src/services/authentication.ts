import { Api } from './../constants/api';
import { Credentials } from './../models/credentials';
import { User } from './../state/types/user';

const login = async (credentials: Credentials): Promise<User | null> => {
  const url: URL = new URL(`${Api.HOST}/users`);
  url.searchParams.append('id', credentials.username);
  url.searchParams.append('password', credentials.password);

  const response: Response = await fetch(url.toString());
  if (response.status !== 200) {
    throw new Error('Http error');
  }

  const data: { id: string }[] = await response.json();

  return data.length > 0 ? { username: data[0].id } : null;
};

export const authentication = {
  login
};
