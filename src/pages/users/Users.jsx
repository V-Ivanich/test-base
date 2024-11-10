import { useAllBase } from '../../store/Store'
import { useShallow } from 'zustand/shallow'
import { useRef, useState } from 'react'
import './users.css'

const keysCol = ['name', 'status']
const usersHeader = ['Имя', 'Должность']
const UsersStatus = [
  'Оптик',
  'Заготовщик',
  'ОТК',
  'Центрировка',
  'ЧПУ',
  'Другое',
]

const Users = () => {
  const refBody = useRef(null)
  const { users } = useAllBase(
    useShallow((state) => ({
      users: state.users,
    })),
  )

  const [isOpen, setIsOpen] = useState(false)
  const [isSelect, setIsSelect] = useState(null)

  const handleAddChangesUser = () => {
    setIsOpen(!isOpen)
  }

  const handleRowUser = ({ target }) => {
    const curr = refBody.current
    curr.childNodes.forEach((el) => {
      el.classList.remove('row-user-active')
    })
    target.parentElement.classList.add('row-user-active')
    setIsSelect(target.parentElement.dataset.id)
  }

  return (
    <div className='user-container'>
      {isOpen && (
        <div className='modal-users'>
          <div className='header-user-modal'>
            <div className='input-section'>
              <input type='text' placeholder='Имя' />
            </div>
            <div className='select-section'>
              <select>
                {UsersStatus.map((status) => (
                  <option key={status}>{status}</option>
                ))}
              </select>
            </div>
          </div>
          <div className='btn-section'>
            <button className='btn-user' onClick={handleAddChangesUser}>
              Сохранить
            </button>
          </div>
        </div>
      )}

      <div className='table-container'>
        {users ? (
          <table>
            <thead>
              <tr>
                {usersHeader.map((hed) => (
                  <th key={hed}>{hed}</th>
                ))}
              </tr>
            </thead>
            <tbody ref={refBody}>
              {users.map((user) => (
                <tr
                  key={user.id}
                  className='row-user'
                  onClick={handleRowUser}
                  data-id={user.id}>
                  {keysCol.map((col) => (
                    <td key={col}>{user[col]}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <tr>Loading...</tr>
        )}
      </div>

      <div className='action-user-btn'>
        <button
          className='btn-user'
          onClick={handleAddChangesUser}
          data-id='add'>
          ДОБАВИТЬ
        </button>
        <button
          className='btn-user'
          onClick={handleAddChangesUser}
          data-id='edit'>
          ИЗМЕНИТЬ
        </button>
        <button className='btn-user'>УДАЛИТЬ</button>
      </div>
    </div>
  )
}

export { Users }
