import axios from 'axios'
import { useState } from 'react'

const SERVER_URL = 'http://localhost:3001'

export const resApi = (patch) => {
  const [dataRes, setDataRes] = useState([])

  const fetchApi = async (patch) => {
    try {
      const response = await axios.get(`${SERVER_URL}/${patch}`)
      if (!response.ok) throw new Error('Failed to fetch/Ошибка запроса')
      const data = await response.json()
      console.log(data, 'resApi')
      setDataRes(data)
    } catch (error) {
      console.log(error.message)
    }
  }

  fetchApi(patch)

  return dataRes
}
