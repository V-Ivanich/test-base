import { useEffect } from 'react'
import { Root } from './root/root'
import { useAllBase } from './store/Store'
import { useShallow } from 'zustand/shallow'
import { ToastContainer } from 'react-toastify'
import './App.css'

function App() {
  const { fetchAll, fetchWorks, fetchUsers, fetchOptions } = useAllBase(
    useShallow((state) => ({
      fetchAll: state.fetchAll,
      fetchWorks: state.fetchWorks,
      fetchUsers: state.fetchUsers,
      fetchOptions: state.fetchOptions,
    })),
  )

  useEffect(() => {
    fetchAll()
    fetchWorks()
    fetchUsers()
    fetchOptions()
  }, [])

  return (
    <>
      <div className='app-wrapper'>
        <Root />
        <ToastContainer />
      </div>
    </>
  )
}

export default App
