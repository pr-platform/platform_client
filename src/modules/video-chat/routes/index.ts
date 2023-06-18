import Rooms from '../views/Rooms.vue'
import Room from '../views/Room.vue'
import Layout from '../views/Layout.vue'

export default [
  {
    name: 'VideoChat',
    path: '/video-chat',
    component: Layout,
    children: [
      {
        name: 'Rooms',
        path: 'rooms',
        component: Rooms,
        meta: {
          protected: true,
        },
      },
      {
        name: 'Room',
        path: 'rooms/:id',
        component: Room,
        meta: {
          protected: true,
        },
      },
    ]
  }
]
