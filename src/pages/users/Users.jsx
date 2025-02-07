import { useAllBase } from '../../store/Store'
import { useShallow } from 'zustand/shallow'
import { usersHeader } from '../../data/Data'
import { useState, useEffect, useRef } from 'react'
import { MyModal } from '../../components/modalWindow/ModalWindow'
import { ContextMenu } from '../../components/contexMenu/ContextMenu'
import './users.css'

// const UsersStatus = [
//   'Оптик',
//   'Заготовщик',
//   'ОТК',
//   'Центрировка',
//   'ЧПУ',
//   'Другое',
// ]

const keysCol = ['name', 'status']

const Users = () => {
  sessionStorage.setItem('page', 'users')
  const refBody = useRef(null)

  const { users } = useAllBase(
    useShallow((state) => ({
      users: state.users,
    })),
  )

  // const [dataGet, setDataGet] = useState([])
  const [isOpenContextMenu, setIsOpenContextMenu] = useState(false)
  const [isOpenModal, setIsOpenModal] = useState(false)
  const [actionButton, setActionButton] = useState(null)
  const [contextID, setContextID] = useState({})
  const [pos, setPos] = useState({ x: 0, y: 0 })

  const handleRowUser = (event) => {
    event.preventDefault()
    setIsOpenContextMenu(true)
    setActionButton('')
    setPos({ x: event.clientX, y: event.clientY })
    setContextID(event.target.parentNode.id)
    // const curr = refBody.current
    // curr.childNodes.forEach((el) => {
    //   el.classList.remove('row-user-active')
    // })
    // target.parentElement.classList.add('row-user-active')
    // setIsSelect(target.parentElement.dataset.id)
  }

  useEffect(() => {
    switch (actionButton) {
      case 'add':
        setIsOpenModal(true)
        setContextID({})
        setIsOpenContextMenu(false)
        break
      case 'edit':
        setIsOpenModal(true)
        setIsOpenContextMenu(false)
        break
      case 'delete':
        setIsOpenModal(true)
        setIsOpenContextMenu(false)
        break
      default:
        setIsOpenContextMenu(false)
        break
    }
  }, [actionButton])

  return (
    <div className='user-container'>
      {isOpenContextMenu && (
        <ContextMenu
          position={pos}
          setActionBtn={setActionButton}
          setIsOpenContext={setIsOpenContextMenu}
        />
      )}
      {isOpenModal && (
        <MyModal
          setIsOpenModal={setIsOpenModal}
          templateForm={usersHeader}
          patch='users'
          actionBtn={actionButton}
          mode='default'
          idData={contextID}
        />
      )}
      <div className='table-container'>
        {users.length ? (
          <table>
            <thead>
              <tr>
                {usersHeader.map((hed) => (
                  <th key={hed.name}>{hed.name}</th>
                ))}
              </tr>
            </thead>
            <tbody ref={refBody}>
              {users.map((user) => (
                <tr
                  key={user.id}
                  className='row-user'
                  onContextMenu={handleRowUser}
                  data-id={user.id}>
                  {keysCol.map((col) => (
                    <td key={col + 55}>{user[col]}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <h2>Loading...</h2>
        )}
      </div>
    </div>
  )
}

export { Users }
