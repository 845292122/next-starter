import { Hono } from 'hono'

export const authRouter = new Hono()

authRouter.post('/register', async c => {
  return c.json({ message: 'register' })
})

authRouter.post('/login', async c => {
  return c.json({ message: 'login' })
})
