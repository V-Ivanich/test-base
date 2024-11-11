import { headers, worksHeader } from '../../data/Data'
import { useState, useEffect } from 'react'
import './modal_window.css'

const ModalWindow = () => {
  const [isData, setIsData] = useState([])

  useEffect(() => {
    const textHeader = sessionStorage.getItem('page')
    if (textHeader === 'general') {
      setIsData(headers)
    } else setIsData(worksHeader)
  }, [])

  return (
    <div className='modal-window'>
      <div className='action-btn'>
        <button>Отмена</button>
        <button>Привязать рабочую</button>
        <button>Сохранить</button>
      </div>
      <div className='title-header'>
        {isData.map((hed) => (
          <div className='colons' key={hed}>
            {hed}
            <input type='text' />
          </div>
        ))}
      </div>
    </div>
  )
}

export { ModalWindow }
