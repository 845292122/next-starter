import type { MiddlewareHandler } from 'hono'

interface RateLimitOptions {
  /** 时间窗口大小（毫秒），默认 60 秒 */
  windowMs?: number
  /** 时间窗口内最大请求数，默认 100 */
  maxRequests?: number
  /** 自定义获取客户端标识的函数 */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  keyGenerator?: (c: any) => string
}

const defaultOptions: Required<RateLimitOptions> = {
  windowMs: 60_000,
  maxRequests: 100,
  keyGenerator: c => {
    return c.req.header('x-forwarded-for') || c.req.header('cf-connecting-ip') || 'unknown'
  }
}

export const createRateLimiter = (options: RateLimitOptions = {}): MiddlewareHandler => {
  const config = { ...defaultOptions, ...options }
  const cache = new Map<string, { count: number; start: number }>()

  // 定期清理过期记录
  setInterval(() => {
    const now = Date.now()
    for (const [key, record] of cache.entries()) {
      if (now - record.start > config.windowMs) {
        cache.delete(key)
      }
    }
  }, config.windowMs)

  return async (c, next) => {
    const clientKey = config.keyGenerator(c)
    const now = Date.now()
    const record = cache.get(clientKey)

    if (!record || now - record.start > config.windowMs) {
      cache.set(clientKey, { count: 1, start: now })
    } else {
      if (record.count >= config.maxRequests) {
        return c.json(
          {
            success: false,
            message: 'Too Many Requests',
            traceId: c.get('traceId')
          },
          429
        )
      }
      record.count++
    }

    return next()
  }
}

// 导出默认配置的实例
export const rateLimit = createRateLimiter()
