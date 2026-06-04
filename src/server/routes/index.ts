import { authRouter } from './auth'
// import { userRouter } from './user'

export const modules = [
  { path: '/auth', router: authRouter }
  //   { path: '/user', router: userRouter }
]
