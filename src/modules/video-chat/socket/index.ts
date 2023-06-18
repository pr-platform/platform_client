import { io, ManagerOptions } from 'socket.io-client'

const options: Partial<ManagerOptions> = {
  forceNew: true,
  timeout: 10000,
  extraHeaders: {
    Authorization: `Bearer ${localStorage.getItem('access_token')}`,
  },
}

let socket = null

type GetSocketArgs = {
  onConnect?: () => void
}

export default function(data?: GetSocketArgs) {
  if (!socket) {
    socket = io('http://localhost:3003', options)
  }

  if (data && data.onConnect) {
    socket.on('connect', data.onConnect)
  }

  return socket
}
