import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

export const useAllBase = create(
  devtools((set, get) => ({
    allorders: [],
    works: [],
    users: [],
    statusOptions: [],
    loading: false,
    error: null,

    AddOrder: async ({ filterObject, patch }) => {
      try {
        const response = await fetch(`http://127.0.0.1:3001/${patch}`, {
          method: 'POST',
          body: JSON.stringify(filterObject),
          headers: {
            'Content-Type': 'application/json',
          },
        })
        console.log(response)
      } catch (error) {
        console.error(error)
      }
      const newObj = [...get()[patch], filterObject]
      set({ [patch]: newObj })
    },

    EditOrder: async ({ filterObject, patch, idData }) => {
      try {
        const response = await fetch(
          `http://127.0.0.1:3001/${patch}/${idData}`,
          {
            method: 'PATCH',
            body: JSON.stringify(filterObject),
            headers: {
              'Content-Type': 'application/json',
            },
          },
        )
        const data = await response.json()
        console.log(data)

        if (!response.ok) {
          throw new Error('Проблема с сервером, попробуйте позже.')
        }
      } catch (error) {
        console.error(error)
      }
      const indexOrder = get()[patch].map((o) => {
        if (o.id === idData) {
          return filterObject
        } else return o
      })
      set({ [patch]: indexOrder })
    },

    fetchOptions: async () => {
      set({ loading: true })

      try {
        const res = await fetch('http://127.0.0.1:3001/statusOptions')
        if (!res.ok) throw new Error('Failed to fetch/Ошибка запроса')
        const data = await res.json()

        set({ statusOptions: data, error: null })
      } catch (err) {
        set({ error: err.message })
      } finally {
        set({ loading: false, error: null })
      }
    },

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
