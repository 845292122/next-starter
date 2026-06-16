'use client'

import {
  Button,
  Drawer,
  DrawerContent,
  Navbar,
  NavbarContent,
  type PressEvent,
  ScrollShadow,
  Tooltip,
  useDisclosure
} from '@heroui/react'
import { BarChart3, Home, Menu, Settings, Users } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Profile from '@/client/components/Profile'

// * 导航菜单项配置
const menuItems = [
  { name: '首页', icon: <Home size={18} />, href: '/home' },
  { name: '数据', icon: <BarChart3 size={18} />, href: '/calendar' },
  { name: '成员', icon: <Users size={18} />, href: '/patient' },
  { name: 'demo', icon: <Settings size={18} />, href: '/demo' }
]

// * LOGO
const Logo = () => (
  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-black shadow-sm">
    <span className="text-base font-bold tracking-tighter text-white">H</span>
  </div>
)

type DesktopNavProps = {
  pathname: string
}

type MobileNavProps = {
  pathname: string
  onClose?: (e: PressEvent) => void
}

const DesktopNav = ({ pathname }: DesktopNavProps) => (
  <div className="flex flex-col gap-1.5 p-1.5">
    {menuItems.map(item => (
      <Tooltip
        key={item.href}
        content={item.name}
        placement="right"
        delay={0}
        closeDelay={0}
        size="sm"
      >
        <Button
          as={Link}
          href={item.href}
          variant={pathname === item.href ? 'flat' : 'light'}
          color={pathname === item.href ? 'primary' : 'default'}
          className={`flex h-13 w-13 min-w-0 flex-col items-center justify-center gap-1 rounded-xl transition-all`}
        >
          {item.icon}
          <span className="scale-90 text-[13px] font-medium opacity-80">{item.name}</span>
        </Button>
      </Tooltip>
    ))}
  </div>
)

const MobileNav = ({ pathname, onClose }: MobileNavProps) => (
  <div className="flex flex-col gap-1 p-4">
    {menuItems.map(item => (
      <Button
        key={item.href}
        as={Link}
        href={item.href}
        onPress={onClose}
        variant={pathname === item.href ? 'flat' : 'light'}
        color={pathname === item.href ? 'primary' : 'default'}
        startContent={item.icon}
        className="h-12 justify-start px-4 text-sm font-medium"
        fullWidth
      >
        {item.name}
      </Button>
    ))}
  </div>
)

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const pathname = usePathname()

  return (
    <div className="bg-background flex min-h-screen flex-col md:flex-row">
      {/* --- 移动端头部 --- */}
      <Navbar isBordered className="h-14 md:hidden" maxWidth="full">
        <NavbarContent justify="start">
          <Button isIconOnly variant="light" size="sm" onPress={onOpen}>
            <Menu size={20} />
          </Button>
        </NavbarContent>
        <NavbarContent justify="center">
          <Logo />
        </NavbarContent>
        <NavbarContent justify="end">
          <Profile />
        </NavbarContent>
      </Navbar>

      {/* --- 移动端顶部抽屉 --- */}
      <Drawer
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="top"
        backdrop="blur"
        classNames={{
          base: 'rounded-b-2xl'
        }}
      >
        <DrawerContent>
          {onClose => (
            <div className="py-4">
              <MobileNav pathname={pathname} onClose={onClose} />
            </div>
          )}
        </DrawerContent>
      </Drawer>

      {/* --- 桌面端侧边栏 --- */}
      <aside className="border-divider bg-content1/30 sticky top-0 hidden h-screen w-16 flex-col border-r backdrop-blur-md md:flex">
        {/* 头部固定 */}
        <div className="flex h-16 shrink-0 items-center justify-center">
          <Logo />
        </div>

        {/* 中间导航自适应滚动 */}
        <ScrollShadow hideScrollBar className="flex flex-1 flex-col items-center py-2">
          <DesktopNav pathname={pathname} />
        </ScrollShadow>

        {/* 底部固定 */}
        <div className="border-divider flex h-16 shrink-0 items-center justify-center border-t">
          <Profile />
        </div>
      </aside>

      {/* --- 主内容区 --- */}
      <main className="flex-1 overflow-x-hidden">
        <div className="p-2 md:p-4">{children}</div>
      </main>
    </div>
  )
}
