import pino from 'pino'

const isProd = process.env.NODE_ENV === 'production'

export const logger = pino(
  {
    level: process.env.LOG_LEVEL ?? 'info',
    base: {
      pid: process.pid
    },
    timestamp: pino.stdTimeFunctions.isoTime
  },
  isProd
    ? pino.transport({
        target: 'pino-roll',
        options: {
          file: 'logs/app-%Y-%m-%d.log',
          frequency: 'daily',
          mkdir: true,
          size: '50m', // 单文件最大 50MB（可选）
          extension: '.log' // 可选，明确一下
        }
      })
    : pino.transport({
        target: 'pino-pretty',
        options: {
          colorize: true,
          translateTime: 'yyyy-mm-dd HH:MM:ss',
          ignore: 'pid,hostname'
        }
      })
)
