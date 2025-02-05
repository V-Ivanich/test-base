import { useState, useEffect } from 'react'
import { MySelect } from '../selectMulti/MySelect'
import { useShallow } from 'zustand/shallow'
import { useAllBase } from '../../store/Store'
import { find } from 'lodash'
import { MyCheck } from '../my_checkbox/myCheckbox'

import './modal_window.css'
import { filter } from 'lodash'

export function MyModal({
  // isOpenModal,
  setIsOpenModal, //тригер закрытия модального окна
  templateForm, // шаблон формы
  // datas,
  actionBtn,
  idData,
  // users,
  mode, // состояние в котором находится окно, (добавление, редакция, удаление)
  // optionsDefault,
  patch,
}) {
  const initialState = {}
  for (let n = 0; n < templateForm.length; n++) {
    if ([templateForm[n]['type']] === 'checkbox') {
      initialState[templateForm[n]['key_name']] = false
    } else {
      initialState[templateForm[n]['key_name']] = ''
    }
  }
  // templateForm.map((elem) => {
  //   if (elem.type === 'checkbox') {
  //     return ([elem.key_name] = false)
  //   } else {
  //     return ([elem.key_name] = '')
  //   }
  // })

  const { allorders, EditOrder, AddOrder } = useAllBase(
    useShallow((state) => ({
      allorders: state[patch],
      EditOrder: state.EditOrder,
      AddOrder: state.AddOrder,
    })),
  )

  const [filterObject, setFilterObject] = useState([])

  function close() {
    setIsOpenModal(false)
  }

  const handleSubmit = () => {
    if (actionBtn === 'add') {
      AddOrder({ filterObject, patch })
    } else {
      EditOrder({ filterObject, patch, idData })
    }
    close()
  }

  const handleChecked = ({ target }) => {
    console.log('checked!!!')
    setFilterObject({ ...filterObject, [target.name]: target.checked })
  }

  const handleChanges = ({ target }) => {
    setFilterObject({ ...filterObject, [target.name]: target.value })
  }

  useEffect(() => {
    if (actionBtn === 'edit') {
      const filterData = find(allorders, ['id', idData])
      setFilterObject(filterData)
    } else if (actionBtn === 'add') {
      setFilterObject(initialState)
    }
  }, [allorders])

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
            {filterObject
              ? templateForm.map((elem) => (
                  <label key={elem.name} className='modal__label'>
                    {elem.name} -
                    {elem.type === 'select' ? (
                      <MySelect
                        key={elem.name}
                        onChange={handleChanges}
                        placeholder={mode === 'multi' ? elem.name : ''}
                        mode={mode}
                        value={filterObject[elem.name]}
                        optionsList={
                          mode !== 'multi' ? optionsDefault : users
                        }></MySelect>
                    ) : (
                      <input
                        type={elem.type}
                        name={elem.key_name}
                        key={elem.key_name}
                        value={
                          elem.type === 'checkbox'
                            ? ''
                            : filterObject[elem.key_name]
                        }
                        checked={
                          elem.type === 'checkbox'
                            ? filterObject[elem.key_name]
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
