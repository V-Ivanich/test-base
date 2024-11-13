import { headers } from '../../data/Data'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useShallow } from 'zustand/shallow'
import { useAllBase } from '../../store/Store'
import MyModal from '../../components/modalWindow/ModalWindow'
import { sortBy } from 'lodash'
import './general.css'

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

  const navigate = useNavigate()

  const handleContext = (e) => {
    e.preventDefault()
    setIsOpenModal(true)
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
    if (isActive) {
      // setDataGet(allorders.sort(compare))
      setDataGet(sortBy(allorders, 'date_out'))
    } else setDataGet(allorders)
  }, [allorders, isActive])

  return (
    // <div className='container'>
    <div className='wrapper_card'>
      {/* {isOpenModal && <ModalWindow />} */}
      <MyModal isOpenModal={isOpenModal} setIsOpenModal={setIsOpenModal} />
      <table className='general-table'>
        <thead>
          <tr>
            {headers.map((nam) => {
              if (nam.name !== 'Завершение') {
                ;<th key={nam.name}>{hedersTitle(nam.name)}</th>
              }
            })}
          </tr>
        </thead>
        <tbody>
          {dataGet.length ? (
            dataGet.map((el) => (
              <tr
                key={el.id}
                className='row-tab'
                onClick={handleRowClick}
                onContextMenu={handleContext}>
                {keysCol.map((kl) => (
                  <td key={kl}>{el[kl]}</td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <th>Loading...</th>
            </tr>
          )}
        </tbody>
      </table>
    </div>
    // </div>
  )
}
