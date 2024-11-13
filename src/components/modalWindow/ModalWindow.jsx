import { headers, worksHeader } from '../../data/Data'
import { useState, useEffect } from 'react'
import { MyCheck } from '../my_checkbox/myCheckbox'
import { Button, Dialog, DialogPanel } from '@headlessui/react'

import './modal_window.css'

export default function MyModal({ isOpenModal, setIsOpenModal }) {
  const [isData, setIsData] = useState([])

  function close() {
    setIsOpenModal(false)
  }

  useEffect(() => {
    const textHeader = sessionStorage.getItem('page')
    if (textHeader === 'general') {
      setIsData(headers)
    } else setIsData(worksHeader)
  }, [])

  return (
    <>
      <Dialog open={isOpenModal} onClose={close}>
        <div className='bg'>
          <DialogPanel className='modal-window'>
            <div className='title-header'>
              {isData.map((hed) => (
                <div className='colons' key={hed.name}>
                  {hed.name}
                  {hed.type === 'checkbox' ? (
                    <MyCheck />
                  ) : (
                    <input type={hed.type} />
                  )}
                </div>
              ))}
            </div>
            <Button className='on-close' onClick={close}>
              X
            </Button>
            <div className='action-btn'>
              <button>Сохранить</button>
              <button>Привязать</button>
              <button>Удалить</button>
              <button>Отмена</button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  )
}
