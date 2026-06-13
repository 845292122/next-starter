import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface AppState {
  theme: 'light' | 'dark'
  toggleTheme: () => void
}

export const useAppStore = create<AppState>()(
  persist(
    set => ({
      theme: 'light',
      toggleTheme: () => set(state => ({ theme: state.theme === 'light' ? 'dark' : 'light' }))
    }),
    {
      name: 'app-store' // 存储在 localStorage 中的键名
    }
  )
)
