'use client'

import { Button, Checkbox, Divider, Form, Input, Link, Tab, Tabs } from '@heroui/react'
import { Eye, EyeClosed, Lock, Smartphone } from 'lucide-react'
import React from 'react'
import AcmeLogo from '@/client/components/Logo'

type LoginMode = 'password' | 'code'

export default function LoginPage() {
  const [isVisible, setIsVisible] = React.useState(false)
  const [mode, setMode] = React.useState<LoginMode>('password')
  const [cooldown, setCooldown] = React.useState(0)

  const toggleVisibility = React.useCallback(() => {
    setIsVisible(v => !v)
  }, [])

  const handleSendCode = React.useCallback(() => {
    if (cooldown > 0) {
      return
    }

    setCooldown(60)
    console.log('send verification code')
  }, [cooldown])

  React.useEffect(() => {
    if (cooldown <= 0) {
      return
    }

    const timer = window.setTimeout(() => {
      setCooldown(value => value - 1)
    }, 1000)

    return () => window.clearTimeout(timer)
  }, [cooldown])

  const handleSubmit = React.useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      const form = event.currentTarget
      const data = new FormData(form)
      const phone = data.get('phone')?.toString() ?? ''
      const password = data.get('password')?.toString() ?? ''
      const code = data.get('code')?.toString() ?? ''
      const remember = Boolean(data.get('remember'))

      console.log('handleSubmit', {
        mode,
        phone,
        ...(mode === 'password'
          ? { password: password ? '••••••' : '' }
          : { code: code ? '••••' : '' }),
        remember
      })
    },
    [mode]
  )

  return (
    <div className="flex min-h-screen w-full items-center justify-center">
      <div className="rounded-large flex w-full max-w-sm flex-col gap-4">
        <div className="flex flex-col items-center pb-6">
          <AcmeLogo />
          <p className="text-xl font-medium">欢迎回来</p>
          <p className="text-small text-default-500">登录您的账户以继续</p>
        </div>

        <Tabs
          aria-label="登录方式"
          className="w-full"
          color="primary"
          variant="underlined"
          fullWidth
          selectedKey={mode}
          onSelectionChange={key => setMode(key as LoginMode)}
        >
          <Tab
            key="password"
            title={
              <span className="flex items-center gap-1.5">
                <Lock size={16} />
                <span>密码登录</span>
              </span>
            }
          >
            <Form
              className="mt-1 flex flex-col gap-3"
              validationBehavior="native"
              onSubmit={handleSubmit}
            >
              <Input
                isRequired
                label="手机号"
                name="phone"
                placeholder="请输入您的手机号"
                type="tel"
                variant="bordered"
                autoComplete="tel"
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
              <Button className="w-full" color="primary" type="submit">
                登录
              </Button>
            </Form>
          </Tab>

          <Tab
            key="code"
            title={
              <span className="flex items-center gap-1.5">
                <Smartphone size={16} />
                <span>验证码登录</span>
              </span>
            }
          >
            <Form
              className="mt-1 flex flex-col gap-3"
              validationBehavior="native"
              onSubmit={handleSubmit}
            >
              <Input
                isRequired
                label="手机号"
                name="phone"
                placeholder="请输入您的手机号"
                type="tel"
                variant="bordered"
                autoComplete="tel"
                autoFocus
              />
              <Input
                isRequired
                endContent={
                  <Button
                    size="sm"
                    type="button"
                    variant="light"
                    isDisabled={cooldown > 0}
                    onClick={handleSendCode}
                  >
                    {cooldown > 0 ? `重新发送 ${cooldown}s` : '获取验证码'}
                  </Button>
                }
                label="验证码"
                name="code"
                placeholder="请输入验证码"
                type="text"
                variant="bordered"
                autoComplete="one-time-code"
              />
              <Button className="w-full" color="primary" type="submit">
                登录
              </Button>
            </Form>
          </Tab>
        </Tabs>

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
