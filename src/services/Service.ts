import axios from '../plugins/axios'

export default class Service {
  protected axios = axios

  public cache = {}
}
