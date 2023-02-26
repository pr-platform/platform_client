import {
  SendEmailArgs,
  SendEmailResponse,
} from '../types';
import Service from '@/services/Service'
import { AxiosInstance } from 'axios';

class MailService extends Service {
  declare axios: AxiosInstance

  public async sendEmail(sendEmailArgs: SendEmailArgs): Promise<SendEmailResponse> {
    if (!sendEmailArgs.to) {
      throw new Error('Email is required')
    }

    const { data } = await this.axios.post<SendEmailResponse>('/mail/send-by-user', sendEmailArgs)

    // if (data && !data.access_token) {
    //   throw new Error('Error')
    // }

    return data
  }
}

export default new MailService()
