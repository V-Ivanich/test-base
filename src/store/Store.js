import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

export const useAllBase = create(
  devtools((set) => ({
    allorders: [],
    works: [],
    users: [],
    loading: false,
    error: null,

    fetchAll: async () => {
      set({ loading: true })

      try {
        const res = await fetch('http://127.0.0.1:3001/allorders')
        if (!res.ok) throw new Error('Failed to fetch/Ошибка запроса')
        const data = await res.json()

        set({ allorders: data, error: null })
      } catch (err) {
        set({ error: err.message })
      } finally {
        set({ loading: false, error: null })
      }
    },

    fetchWorks: async () => {
      set({ loading: true })

      try {
        const res = await fetch('http://127.0.0.1:3001/works')
        if (!res.ok) throw new Error('Failed to fetch/Ошибка запроса')
        const data = await res.json()

        set({ works: data, error: null })
      } catch (err) {
        set({ error: err.message })
      } finally {
        set({ loading: false, error: null })
      }
    },

    fetchUsers: async () => {
      set({ loading: true })

      try {
        const res = await fetch('http://127.0.0.1:3001/users')
        if (!res.ok) throw new Error('Failed to fetch/Ошибка запроса')
        const data = await res.json()

        set({ users: data, error: null })
      } catch (err) {
        set({ error: err.message })
      } finally {
        set({ loading: false, error: null })
      }
    },
  })),
)
