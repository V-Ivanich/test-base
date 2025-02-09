import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { CreateOrder, EditOrder, RemoveOrder } from '../utils'

export const useAllBase = create(
  devtools((set, get) => ({
    allorders: [],
    works: [],
    users: [],
    statusOptions: [],
    loading: false,
    error: null,

    AddOrder: ({ filterObject: order, patch }) => {
      CreateOrder({ order, patch })
      const newObj = [...get()[patch], order]
      set({ [patch]: newObj })
    },

    EditOrders: ({ filterObject: editOrder, patch, idData: id }) => {
      EditOrder({ id, patch, editOrder })
      const indexOrder = get()[patch].map((o) => {
        if (o.id === id) {
          return editOrder
        } else return o
      })
      set({ [patch]: indexOrder })
    },

    DeleteOrders: ({ idData, patch }) => {
      RemoveOrder(idData, patch)
      const indexOrder = get()[patch].filter((o) => {
        o.id !== idData
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
