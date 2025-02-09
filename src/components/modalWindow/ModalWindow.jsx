import { useState, useEffect } from 'react'
import { MySelect } from '../selectMulti/MySelect'
import { useShallow } from 'zustand/shallow'
import { useAllBase } from '../../store/Store'
import { deleteMessage } from '../../data/Data'
import { find } from 'lodash'
import PropTypes from 'prop-types'
// import { MyCheck } from '../my_checkbox/myCheckbox'

import './modal_window.css'

export function MyModal({
  setIsOpenModal, //тригер закрытия модального окна
  templateForm,
  patch,
  actionBtn,
  idData,
  mode, // состояние в котором находится окно, (добавление, редакция, удаление)
}) {
  let initialState = {}

  const StartData = () => {
    initialState = templateForm.map((elem) => {
      if (elem.type === 'checkbox') {
        return { [elem.key_name]: false }
      } else {
        console.log(elem.key_name, '--keyname')
        return ([elem.key_name] = '')
      }
    })
  }

  const { currentObject, EditOrders, AddOrder, users, DeleteOrders } =
    useAllBase(
      useShallow((state) => ({
        currentObject: state[patch],
        EditOrders: state.EditOrders,
        AddOrder: state.AddOrder,
        users: state.users,
        DeleteOrders: state.DeleteOrders,
      })),
    )

  const [filterObject, setFilterObject] = useState([])

  function close() {
    setIsOpenModal(false)
  }

  const handleSubmit = () => {
    if (actionBtn === 'add') {
      AddOrder({ filterObject, patch })
    } else if (actionBtn === 'edit') {
      EditOrders({ filterObject, patch, idData })
    } else if (actionBtn === 'delete') {
      DeleteOrders({ idData, patch })
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
      const filterData = find(currentObject, ['id', idData])
      setFilterObject(filterData)
    } else if (actionBtn === 'add') {
      StartData()
      setFilterObject(initialState)
    } else if (actionBtn === 'delete') {
      templateForm = [...deleteMessage]
      setFilterObject([])
    }
    console.log(templateForm, filterObject)
  }, [actionBtn])

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
            {filterObject ? (
              templateForm.map((elem) => (
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
                        elem.type === 'checkbox' ? handleChecked : handleChanges
                      }
                    />
                  )}
                </label>
              ))
            ) : (
              <div>
                <h2>{templateForm[0]}</h2>
                <h3>{templateForm[1]}</h3>
                <h3>{templateForm[2]}</h3>
              </div>
            )}
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

MyModal.propTypes = {
  setIsOpenModal: PropTypes.func,
  templateForm: PropTypes.array,
  patch: PropTypes.string,
  actionBtn: PropTypes.string,
  idData: PropTypes.string,
  mode: PropTypes.string,
}
