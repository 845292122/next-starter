'use client'

import { useState } from 'react'
import { Card, CardHeader, CardBody, Input, Button, Image } from '@heroui/react'
import { Bell, Eye, Filter } from 'lucide-react'

/**
 * 今日经营状况：
 *  - 今日销售额
 *  - 昨日销售额
 *  - 本月销售额
 * 今日预警：
 *  - 农夫山泉库存不足
 *  - 可口可乐销售下降16%
 *  - 30个会员15天没消费
 */
export default function DashboardPage() {
  const [activeButtons, setActiveButtons] = useState<Record<'bell' | 'eye' | 'filter', boolean>>({
    bell: false,
    eye: false,
    filter: false
  })

  const infoRows = [
    { label: '主播', value: '李老师' },
    { label: '粉丝数', value: '12,380' },
    { label: '观众数', value: '328' },
    { label: '累计观看人数', value: '15,320' },
    { label: '本场点赞数', value: '1,432' }
  ]

  const toggleButton = (key: keyof typeof activeButtons) => {
    setActiveButtons(prev => ({ ...prev, [key]: !prev[key] }))
  }

  return (
    // 外层容器：flex 水平排列，gap 控制间距，p 控制内边距
    <div className="bg-default-5 flex h-screen gap-4 p-4">
      {/* ====== 左侧区域 ====== */}
      <div className="flex w-1/2 flex-col gap-4">
        {/* 左上卡片 —— 固定高度 300px */}
        <Card className="h-75 shrink-0">
          <CardHeader>
            {/* TODO: 点击连接后输入框禁止输入，连接变成断联 */}
            <Input
              size="sm"
              label="房间号: "
              type="text"
              endContent={
                <Button size="sm" onPress={() => alert('查询房间号')}>
                  连接
                </Button>
              }
            />
          </CardHeader>
          <CardBody className="overflow-y-auto">
            <div className="flex items-start gap-4">
              <Image
                alt="HeroUI hero Image"
                src="https://encrypted-tbn3.gstatic.com/licensed-image?q=tbn:ANd9GcTRwgXpcC7Gvolm1dweGsvnEh3eREiQyGHn0uzFgPRw4UmjbYXQiEY_Zx9mu1AJhMi-hYfEdnCqt3Whye8"
                width={290}
                className="rounded-medium"
              />

              <div className="min-w-0 flex-1">
                <div className="mb-3 flex items-center justify-between">
                  <div className="text-sm font-semibold">00:12:35</div>
                  <div className="flex items-center gap-1.5">
                    <span className="bg-success h-2 w-2 rounded-full" />
                    <span className="text-success text-xs">已连接</span>
                  </div>
                </div>

                <div className="space-y-1.5">
                  {infoRows.map(row => (
                    <div
                      key={row.label}
                      className="border-default-200 flex items-center justify-between border-b py-1.5 text-xs"
                    >
                      <span className="text-default-600">{row.label}</span>
                      <span className="text-default-900 font-medium">{row.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* 左下卡片 —— flex-1 填满剩余空间 */}
        <Card className="min-h-0 flex-1">
          <CardHeader className="flex items-center justify-between">
            <h4 className="font-medium">弹幕信息汇总</h4>
            <div className="flex items-center gap-2">
              <Button
                isIconOnly
                size="sm"
                variant="light"
                className={`min-w-unit-8 ${activeButtons.bell ? 'bg-default-200 text-default-500' : 'text-default-600 hover:bg-default-100'}`}
                onPress={() => toggleButton('bell')}
                aria-label="通知"
              >
                <Bell size={16} />
              </Button>
              <Button
                isIconOnly
                size="sm"
                variant="light"
                className={`min-w-unit-8 ${activeButtons.eye ? 'bg-default-200 text-default-500' : 'text-default-600 hover:bg-default-100'}`}
                onPress={() => toggleButton('eye')}
                aria-label="查看"
              >
                <Eye size={16} />
              </Button>
              <Button
                isIconOnly
                size="sm"
                variant="light"
                className={`min-w-unit-8 ${activeButtons.filter ? 'bg-default-200 text-default-500' : 'text-default-600 hover:bg-default-100'}`}
                onPress={() => toggleButton('filter')}
                aria-label="筛选"
              >
                <Filter size={16} />
              </Button>
            </div>
          </CardHeader>
          <CardBody className="overflow-y-auto">
            <p>这里会自动填满剩余空间，比如列表、表格等。</p>
          </CardBody>
        </Card>
      </div>

      {/* ====== 右侧区域 ====== */}
      <Card className="h-full w-1/2">
        <CardHeader>
          <h4 className="font-medium">实时弹幕</h4>
        </CardHeader>
        <CardBody className="overflow-y-auto">
          <p>右侧整块卡片，占满整个高度。</p>
        </CardBody>
      </Card>
    </div>
  )
}
