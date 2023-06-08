import Service from '@/services/Service'
import { AxiosInstance } from 'axios'

class EventsService extends Service {
  declare axios: AxiosInstance
}

export default new EventsService()
