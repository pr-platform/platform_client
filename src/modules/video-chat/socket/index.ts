import { io, ManagerOptions } from 'socket.io-client'

const options: Partial<ManagerOptions> = {
  forceNew: true,
  timeout: 10000,
  transports: ['websocket'],
}

const socket = io('http://localhost:3003', options);

export default socket;