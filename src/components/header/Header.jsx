import { NavLink } from 'react-router-dom'
import './header.css'

export const Header = () => {
  const handleClearStorageKey = (e) => {
    console.log(e.target)
    localStorage.setItem('id_order', '')
  }

  return (
    <div className='container'>
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
      </div>
    </div>
  )
}
