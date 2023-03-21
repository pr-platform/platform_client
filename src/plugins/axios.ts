import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://localhost:3003/api',
});

instance.interceptors.request.use(config => {
    config.headers['Authorization'] = `Bearer ${localStorage.getItem('access_token')}`
    return config
  },
  error => Promise.reject(error)
)

export default instance
