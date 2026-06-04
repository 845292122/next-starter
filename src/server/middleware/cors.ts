import type { MiddlewareHandler } from 'hono'
import { cors } from 'hono/cors'

const DEFAULT_ALLOWED_METHODS = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS']

export const corsMiddleware: MiddlewareHandler = cors({
  origin: (origin, _) => {
    // 无 Origin（curl / server-to-server）
    if (!origin) return '*'

    // * 读取允许的来源列表
    const allowedOrigins = process.env.CORS_ORIGINS?.split(',') ?? []

    // 本地开发放行
    if (process.env.NODE_ENV !== 'production') {
      return origin
    }

    // 精确匹配
    if (allowedOrigins.includes(origin)) {
      return origin
    }

    return null
  },
  allowMethods: DEFAULT_ALLOWED_METHODS,
  allowHeaders: ['Content-Type', 'Authorization', 'X-Request-Id'],
  exposeHeaders: ['X-Request-Id'],
  credentials: true,
  maxAge: 86400 // 24h
})
