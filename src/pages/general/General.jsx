import { headers } from '../../data/Data'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useShallow } from 'zustand/shallow'
import { useAllBase } from '../../store/Store'
import { ContextMenu } from '../../components/contexMenu/ContextMenu'
import { sortBy, uniqueId } from 'lodash'
// import { CreateOrder } from '../../utils/CreateOrder'
import './general.css'
import { MyModal } from '../../components/modalWindow/ModalWindow'

const keysCol = [
  'id_order',
  'order',
  'ispolnitel',
  'type_item',
  'coint',
  'inside',
  'outside',
  'date_cashe',
  'date_out',
]

export const BaseGeneral = () => {
  sessionStorage.setItem('page', 'general')
  const { allorders } = useAllBase(
    useShallow((state) => ({
      allorders: state.allorders,
    })),
  )

  const [dataGet, setDataGet] = useState([])
  const [isActive, setIsActive] = useState(false)
  const [isOpenModal, setIsOpenModal] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isOpenContext, setIsOpenContext] = useState(false)
  const [actionBtn, setActionBtn] = useState('')
  const [contextID, setContextID] = useState({})

  const navigate = useNavigate()

  const handleContext = (e) => {
    e.preventDefault()
    setIsOpenContext(true)
    setActionBtn('')
    setPosition({ x: e.clientX, y: e.clientY })
    setContextID(e.target.parentNode.id)
  }

  const handleRowClick = ({ target }) => {
    sessionStorage.setItem(
      'id_order',
      target.parentNode.firstElementChild.innerText,
    )
    navigate('/works')
  }

  const handleBtnHeader = () => {
    setIsActive(!isActive)
  }

  const hedersTitle = (text) => {
    if (text === 'Срок исполнения') {
      return (
        <button
          className={!isActive ? 'btn-header' : 'btn-active '}
          onClick={handleBtnHeader}>
          {text}
        </button>
      )
    } else return text
  }

  useEffect(() => {
    switch (actionBtn) {
      case 'add':
        // setSelectionByContext({})
        setIsOpenContext(false)
        setIsOpenModal(true)
        break
      case 'edit':
        setIsOpenContext(false)
        setIsOpenModal(true)
        break

      default:
        setIsOpenContext(false)
        break
    }
  }, [actionBtn])

  // сортировка по дате
  useEffect(() => {
    if (isActive) {
      setDataGet(sortBy(allorders, 'date_out'))
    } else setDataGet(allorders)
  }, [allorders, isActive])

  return (
    <div className='wrapper_card'>
      {isOpenContext && (
        <ContextMenu
          position={position}
          setActionBtn={setActionBtn}
          setIsOpenContext={setIsOpenContext}
        />
      )}
      {isOpenModal && (
        <MyModal
          setIsOpenModal={setIsOpenModal}
          templateForm={headers}
          patch='allorders'
          actionBtn={actionBtn}
          idData={contextID}
          // mode='multi'
        />
      )}
      {dataGet.length ? (
        <table className='general-table'>
          <thead>
            <tr>
              {headers.map((nam) => {
                if (nam.name !== 'Завершение') {
                  return <th key={nam.name}>{hedersTitle(nam.name)}</th>
                }
              })}
            </tr>
          </thead>
          <tbody>
            {dataGet.map((el) => (
              <tr
                id={el.id}
                key={uniqueId()}
                // id={el.id}
                className='row-tab'
                onClick={handleRowClick}
                onContextMenu={handleContext}>
                {keysCol.map((kl) => (
                  <td key={uniqueId()}>{el[kl]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        'Loading...'
      )}
    </div>
  )
}
