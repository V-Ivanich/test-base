import { NavLink } from 'react-router-dom'
import { ModalWindow } from '../modalWindow/ModalWindow'
import { useState } from 'react'
import './header.css'

export const Header = () => {
  const [isOpenModal, setIsOpenModal] = useState(false)
  const [editBtn, setEditBtn] = useState(false)

  const handleClearStorageKey = (e) => {
    console.log(e.target)
    // localStorage.setItem('id_order', '')
  }

  const handleEditWorks = () => {
    setEditBtn(!editBtn)
    setIsOpenModal(!isOpenModal)
  }

  return (
    <div className='container'>
      {isOpenModal && <ModalWindow />}
      <div className='menu__container'>
        <NavLink
          data-active='general'
          onClick={handleClearStorageKey}
          className={({ isActive }) => (isActive ? 'activeLink' : '')}
          to='/'>
          ОСНАВНАЯ ТАБЛИЦА
        </NavLink>
        <NavLink
          data-active='works'
          onClick={handleClearStorageKey}
          className={({ isActive }) => (isActive ? 'activeLink' : '')}
          to='/works'>
          РАБОЧАЯ ТАБЛИЦА
        </NavLink>
        <NavLink
          data-active='users'
          onClick={handleClearStorageKey}
          className={({ isActive }) => (isActive ? 'activeLink' : '')}
          to='/users'>
          СПЕЦИАЛИСТЫ
        </NavLink>
        <div className='active-window'>
          <button onClick={() => setIsOpenModal(!isOpenModal)}>ДОБАВИТЬ</button>
          <button
            className={editBtn ? 'btn-edit' : ''}
            onClick={handleEditWorks}>
            ИЗМЕНИТЬ
          </button>
        </div>
      </div>
    </div>
  )
}
