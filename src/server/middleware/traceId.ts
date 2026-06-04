import type { MiddlewareHandler } from 'hono'
import { COMMON_CONSTANT } from '@/shared/constants/common'
import { logger } from '@/shared/lib/logger'

export const traceIdMiddleware: MiddlewareHandler = async (c, next) => {
  const traceId = c.req.header(COMMON_CONSTANT.TRACE_ID) ?? crypto.randomUUID()
  c.set('traceId', traceId)
  c.header(COMMON_CONSTANT.TRACE_ID, traceId)
  c.set(
    'logger',
    logger.child({
      traceId,
      path: c.req.path,
      method: c.req.method
    })
  )

  await next()
}
