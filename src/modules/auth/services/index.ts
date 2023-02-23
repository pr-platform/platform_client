import {
  GetAccessTokenArgs,
  GetAccessTokenResponse,
  RegistrationArgs,
  RegistrationResponse,
  VerifiedArgs,
  VerifiedResponse,
  RequestOnResetPasswordArgs,
  RequestOnResetPasswordResponse,
  ResetPasswordArgs,
  ResetPasswordResponse,
} from '../types';
import Service from '@/services/Service'
import { AxiosInstance } from 'axios';

class AuthService extends Service {
  declare axios: AxiosInstance

  public async getAccessToken(getAccessTokenArgs: GetAccessTokenArgs): Promise<GetAccessTokenResponse> {
    if (!getAccessTokenArgs.email) {
      throw new Error('Email is required')
    }

    if (!getAccessTokenArgs.password) {
      throw new Error('Password is required')
    }

    const { data } = await this.axios.post<GetAccessTokenResponse>('/auth/login', getAccessTokenArgs)

    if (data && !data.access_token) {
      throw new Error('Error')
    }

    return data
  }

  public async registration(registrationArgs: RegistrationArgs): Promise<RegistrationResponse> {
    if (!registrationArgs.email) {
      throw new Error('Email is required')
    }

    if (!registrationArgs.password) {
      throw new Error('Password is required')
    }

    const { data } = await this.axios.post<RegistrationResponse>('/auth/registration', registrationArgs)

    if (data.message !== 'ok') {
      throw new Error('Registration faild')
    }

    return data
  }

  public async verified(verifiedArgs: VerifiedArgs): Promise<VerifiedResponse> {
    if (!verifiedArgs.verified_token) {
      throw new Error('Token is required')
    }

    const { data } = await this.axios.post<VerifiedResponse>('/auth/verified', verifiedArgs)

    if (data.message !== 'ok') {
      throw new Error('Verified failed')
    }

    return data
  }

  public async requestOnResetPassword(requestOnResetPasswordArgs: RequestOnResetPasswordArgs): Promise<RequestOnResetPasswordResponse> {
    if (!requestOnResetPasswordArgs.email) {
      throw new Error('Email is required')
    }

    const { data } = await this.axios.post<RequestOnResetPasswordResponse>('/auth/request-on-reset-password', requestOnResetPasswordArgs)

    if (data.message !== 'ok') {
      throw new Error('Request on reset password failed')
    }

    return data
  }

  public async resetPassword(resetPasswordArgs: ResetPasswordArgs): Promise<ResetPasswordResponse> {
    if (!resetPasswordArgs.password) {
      throw new Error('Password is required')
    }

    if (!resetPasswordArgs.reset_token) {
      throw new Error('Token is required')
    }

    const { data } = await this.axios.post<ResetPasswordResponse>('/auth/reset-password', resetPasswordArgs)

    if (data.message !== 'ok') {
      throw new Error('Reset password failed')
    }

    return data
  }
}

export default new AuthService()
