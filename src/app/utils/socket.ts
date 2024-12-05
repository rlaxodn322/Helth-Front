import { io, Socket } from 'socket.io-client';

const socket: Socket = io('http://localhost:3002', {
  transports: ['websocket'],
  withCredentials: true,
});

export default socket;
