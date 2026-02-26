import { defineStore } from 'pinia'

export const useThemeStore = defineStore('theme', {
  state: () => ({
    darkMode: false
  }),
  actions: {
    toggleTheme() {
      this.darkMode = !this.darkMode
      localStorage.setItem('theme', this.darkMode ? 'dark' : 'light')
      document.documentElement.classList.toggle('dark', this.darkMode)
    },
    restoreTheme() {
      const stored = localStorage.getItem('theme')
      this.darkMode = stored === 'dark'
      document.documentElement.classList.toggle('dark', this.darkMode)
    }
  }
})