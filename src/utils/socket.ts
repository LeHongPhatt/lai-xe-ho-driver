import { io } from 'socket.io-client';
import { IP_HOST } from '@env';

export const initSocket = token => {
  return io(IP_HOST, {
    extraHeaders: {
      Authorization: `Bearer ${token}`,
    },
  });
};
