'use client'

import { Button, Checkbox, Divider, Form, Input, Link } from '@heroui/react'
import { Eye, EyeClosed } from 'lucide-react'
import React from 'react'
import AcmeLogo from '@/client/components/Logo'

export default function LoginPage() {
  const [isVisible, setIsVisible] = React.useState(false)

  const toggleVisibility = React.useCallback(() => {
    setIsVisible(v => !v)
  }, [])

  // const wechatIcon = React.useMemo(() => <SiWechat color="#07C160" size={20} />, [])

  const handleSubmit = React.useCallback((event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)
    const email = data.get('email')?.toString() ?? ''
    const password = data.get('password')?.toString() ?? ''
    const remember = Boolean(data.get('remember'))

    console.log('handleSubmit', { email, password: password ? '••••••' : '', remember })
  }, [])

  return (
    <div className="flex min-h-screen w-full items-center justify-center">
      <div className="rounded-large flex w-full max-w-sm flex-col gap-4">
        <div className="flex flex-col items-center pb-6">
          <AcmeLogo />
          <p className="text-xl font-medium">欢迎回来</p>
          <p className="text-small text-default-500">登录您的账户以继续</p>
        </div>
        <Form className="flex flex-col gap-3" validationBehavior="native" onSubmit={handleSubmit}>
          <Input
            isRequired
            label="电子邮件"
            name="email"
            placeholder="请输入您的电子邮件"
            type="email"
            variant="bordered"
            autoComplete="email"
            autoFocus
          />
          <Input
            isRequired
            endContent={
              <button
                type="button"
                onClick={toggleVisibility}
                aria-pressed={isVisible}
                aria-label={isVisible ? '隐藏密码' : '显示密码'}
                title={isVisible ? '隐藏密码' : '显示密码'}
              >
                {isVisible ? <EyeClosed /> : <Eye />}
              </button>
            }
            label="密码"
            name="password"
            placeholder="请输入您的密码"
            type={isVisible ? 'text' : 'password'}
            variant="bordered"
            autoComplete="current-password"
          />
          <div className="flex w-full items-center justify-between px-1 py-2">
            <Checkbox name="remember" size="sm">
              保持登录
            </Checkbox>
            <Link className="text-default-500" href="#" size="sm">
              忘记密码？
            </Link>
          </div>
          <Button className="w-full" color="primary" type="submit">
            登录
          </Button>
        </Form>
        <div className="flex items-center gap-4 py-2">
          <Divider className="flex-1" />
          <p className="text-tiny text-default-500 shrink-0">或</p>
          <Divider className="flex-1" />
        </div>
        <div className="flex flex-col gap-2">
          <Button variant="bordered">使用微信登录</Button>
        </div>
        <p className="text-small text-center">
          Need to create an account?&nbsp;
          <Link href="#" size="sm">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  )
}
