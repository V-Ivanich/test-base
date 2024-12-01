import { headers, worksHeader } from '../../data/Data'
import { useState, useEffect } from 'react'
import { MyCheck } from '../my_checkbox/myCheckbox'

import './modal_window.css'

export function MyModal({
  isOpenModal,
  setIsOpenModal,
  templateGeneral,
  datas,
  editData,
}) {
  const initialState = {}

  startArguments()

  function startArguments() {
    if (editData && Array.isArray(templateGeneral)) {
      Object.assign(initialState, editData)
    }

    if (Array.isArray(templateGeneral)) {
      templateGeneral.forEach((elem) => {
        initialState[elem.name] = ''
      })
    }
    console.log(initialState)
    return initialState
  }

  const [valueState, setValueState] = useState(
    editData ? editData : initialState,
  )
  const [isData, setIsData] = useState([])
  const [isOpenContextMenu, setIsOpenContextMenu] = useState(true)

  function close() {
    setIsOpenModal(false)
    setIsOpenContextMenu(false)
  }

  const handleSubmit = () => {
    console.log(valueState, 'form return!')
    if (!Array.isArray(templateGeneral)) {
      datas({ delete: true })
    } else datas(valueState)
    close()
  }

  const handleChanges = ({ target }) => {
    setValueState({
      ...valueState,
      [target.name]: target.value,
    })
  }

  const handleChecked = ({ target }) => {
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
      <div className='modal' onClick={() => isOpenModal(false)}>
        <div className='modal__container' onClick={(e) => e.stopPropagation()}>
          <button
            className='modal__btn-close'
            onClick={() => setIsOpenModal(false)}>
            &#10006;
          </button>
          <div className='modal__form-content'>
            {Array.isArray(templateGeneral)
              ? templateGeneral.map((elem) => (
                  <label key={elem.name} className='modal__label'>
                    {elem.name} -
                    {elem.type === 'select' ? (
                      <select
                        onChange={handleChanges}
                        name={elem.name}
                        value={valueState[elem.name]}>
                        <option value=''></option>
                        {users.map((user) => (
                          <option key={user.id} value={user.name}>
                            {user.name}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <input
                        type={elem.type}
                        name={elem.name}
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
              : templateGeneral}
            <div className='modal__actions-btn'>
              <button onClick={handleSubmit}>Применить!</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
