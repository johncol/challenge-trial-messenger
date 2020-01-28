import { Api } from './../constants';
import { RemoteUser } from './../models/remote';
import { Credentials } from './../models';
import { User } from './../state/types';

const login = async (credentials: Credentials): Promise<User | null> => {
  const url: URL = new URL(`${Api.HOST}/users`);
  url.searchParams.append('id', credentials.username);
  url.searchParams.append('password', credentials.password);

  const response: Response = await fetch(url.toString());
  if (response.status !== 200) {
    throw new Error('Http error');
  }

  const data: RemoteUser[] = await response.json();
  if (data.length === 0) {
    return null;
  }

  return { username: data[0].id, avatar: data[0].avatar };
};

export const authentication = {
  login
};
