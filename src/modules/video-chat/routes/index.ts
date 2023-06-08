import Rooms from '../views/Rooms.vue'
import Room from '../views/Room.vue'

export default [
  {
    name: 'Rooms',
    path: '/rooms',
    component: Rooms,
    meta: {
      protected: false,
    },
  },
  {
    name: 'Room',
    path: '/rooms/:id',
    component: Room,
    meta: {
      protected: false,
    },
  },
]
