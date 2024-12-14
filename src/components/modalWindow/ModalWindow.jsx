import { headers, worksHeader } from '../../data/Data'
import { useState, useEffect } from 'react'
import { MyCheck } from '../my_checkbox/myCheckbox'

import './modal_window.css'

export function MyModal({
  // isOpenModal,
  setIsOpenModal,
  templateForm,
  datas,
  editData,
  users,
}) {
  const initialState = {}

  startArguments()

  function startArguments() {
    if (Object.keys(editData).length && Array.isArray(templateForm)) {
      Object.assign(initialState, editData)
    } else if (Array.isArray(templateForm)) {
      templateForm.forEach((elem) => {
        initialState[elem.key_name] = ''
      })
    }
    return initialState
  }

  const [valueState, setValueState] = useState(initialState)
  const [isData, setIsData] = useState([])
  // const [isOpenContextMenu, setIsOpenContextMenu] = useState(true)

  function close() {
    setIsOpenModal(false)
    // setIsOpenContextMenu(false)
  }

  const handleSubmit = () => {
    console.log(valueState, 'form return!')
    if (!Array.isArray(templateForm)) {
      datas({ delete: true })
    } else datas(valueState)
    close()
  }

  const handleChanges = ({ target }) => {
    console.log(valueState)
    console.log(target.value, 'changes!!!')
    console.log(target.name, 'имя????')
    setValueState({
      ...valueState,
      [target.name]: target.value,
    })
  }

  const handleChecked = ({ target }) => {
    console.log(target.checked)
    setValueState({
      ...valueState,
      [target.name]: target.checked,
    })
  }

  useEffect(() => {
    const textHeader = sessionStorage.getItem('page')
    if (textHeader === 'general') {
      setIsData(headers)
    } else setIsData(worksHeader)
  }, [])

  return (
    <>
      <div className='modal' onClick={() => setIsOpenModal(false)}>
        <div className='modal__container' onClick={(e) => e.stopPropagation()}>
          <button
            className='modal__btn-close'
            onClick={() => setIsOpenModal(false)}>
            &#10006;
          </button>
          <div className='modal__form-content'>
            {Array.isArray(templateForm)
              ? templateForm.map((elem) => (
                  <label key={elem.name} className='modal__label'>
                    {elem.name} -
                    {elem.type === 'select' ? (
                      <select
                        onChange={handleChanges}
                        name={elem.name}
                        value={valueState[elem.name]}>
                        <option value=''></option>
                        {users.map((user) => (
                          <option key={user.id} value={user.status}>
                            {user.status}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <input
                        type={elem.type}
                        name={elem.key_name}
                        value={
                          elem.type === 'checkbox'
                            ? ''
                            : valueState[elem.key_name]
                        }
                        checked={
                          elem.type === 'checkbox'
                            ? valueState[elem.key_name]
                            : ''
                        }
                        onChange={
                          elem.type === 'checkbox'
                            ? handleChecked
                            : handleChanges
                        }
                      />
                    )}
                  </label>
                ))
              : templateForm}
            <div className='modal__actions-btn'>
              <button onClick={handleSubmit} className='btn-user'>
                Применить!
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
