import axios from 'axios'

const api = axios.create({
  baseURL: '/api',
  timeout: 10000
})

// 请求拦截器：自动带上 Token
api.interceptors.request.use(config => {
  // 注意：如果在服务端执行，这里可能没有 window
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
  }

  return config
})

// 响应拦截器：统一处理错误
api.interceptors.response.use(
  // 直接返回 data，省去每次 .data 的麻烦
  response => response.data,
  error => {
    if (error.response?.status === 401) {
      // TODO: 处理登录过期，比如清除 token 或跳转登录页
      console.error('未授权，请重新登录')
    }
    return Promise.reject(error)
  }
)
