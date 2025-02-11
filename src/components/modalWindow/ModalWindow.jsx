import { useState, useEffect } from 'react'
import { MySelect } from '../selectMulti/MySelect'
import { useShallow } from 'zustand/shallow'
import { useAllBase } from '../../store/Store'
import { deleteMessage } from '../../data/Data'
import { Slide, toast } from 'react-toastify'
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
    templateForm.forEach((elem) => {
      if (elem.type === 'checkbox') {
        initialState[elem.key_name] = false
      } else {
        initialState[elem.key_name] = ''
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

  const notify = () =>
    toast.info('Изменения приняты!', {
      position: 'top-right',
      autoClose: 700,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'colored',
      transition: Slide,
    })

  const handleSubmit = () => {
    if (actionBtn === 'add') {
      AddOrder({ filterObject, patch })
    } else if (actionBtn === 'edit') {
      EditOrders({ filterObject, patch, idData })
    } else if (actionBtn === 'delete') {
      DeleteOrders({ idData, patch })
    }
    close()
    notify()
  }

  const handleChecked = ({ target }) => {
    console.log('checked!!!')
    setFilterObject({ ...filterObject, [target.name]: target.checked })
  }

  const handleChanges = ({ target }) => {
    setFilterObject({ ...filterObject, [target.name]: target.value })
  }

  useEffect(() => {
    let filterData
    switch (actionBtn) {
      case 'add':
        StartData()
        console.log(initialState)
        setFilterObject(initialState)
        break
      case 'edit':
        filterData = find(currentObject, ['id', idData])
        setFilterObject(filterData)
        break
      case 'delete':
        setFilterObject([])
        break
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
            {actionBtn === 'add' || actionBtn === 'edit'
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
              : deleteMessage.map((item, index) => (
                  <h4 key={index} style={{ textAlign: 'center' }}>
                    {item}
                  </h4>
                ))}
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
