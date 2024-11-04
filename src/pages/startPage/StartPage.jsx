import { Outlet, useLocation } from 'react-router-dom'
import { Header } from '../../components/header/Header'
import { BaseGeneral } from '../general/General'
// import { reducer, initionState } from '../../reducer/Reducer'
// import { useEffect } from 'react'
// import axios from 'axios'

export const StartPage = () => {
  let { pathname } = useLocation()
  // const [, dispatch] = useReducer(reducer, initionState)

  // useEffect(() => {
  //   dispatch({ type: 'PROGRESS' })

  // const getItems = async () => {
  //   try {
  //     let response = await axios.get('http://127.0.0.1:3001/user')
  //     if (response.status === 200) {
  //       dispatch({ type: 'SUCCESS_USER', data: response.data })
  //     }
  //   } catch (err) {
  //     console.log(err)
  //     dispatch({ type: 'ERROR', error: err.message })
  //   }
  // }

  //   getItems()
  // }, [])

  // useEffect(() => {
  //   dis      <ModalWindow />
  //   const getItems2 = async () => {
  //     try {React from 'react'
  //       let response = await axios.get('http://127.0.0.1:3001/otk')
  //       if (response.status === 200) {
  //         dispatch({ type: 'SUCCESS_OTK', data: response.data })
  //       }
  //     } catch (err) {
  //       console.log(err)
  //       dispatch({ type: 'ERROR', error: err.message })
  //     }
  //   }

  //   getItems2()
  // }, [])

  return (
    <div>
      <Header />
      {pathname !== '/' ? <Outlet /> : <BaseGeneral />}
    </div>
  )
}
