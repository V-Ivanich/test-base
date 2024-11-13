import { worksHeader } from '../../data/Data'
import { useEffect, useState, useRef } from 'react'
import { useAllBase } from '../../store/Store'
import { useShallow } from 'zustand/shallow'
import { MySelect } from '../../components/selectMulti/MySelect'
import { ContextMenu } from '../../components/contexMenu/ContextMenu'
import { filter, find } from 'lodash'

import './works.css'

const keysCol = [
  'id_order',
  'date',
  'incount',
  'user',
  'user_otk',
  'date_otk',
  'goot',
  'no_goot',
  'fuck',
]

export const WorksData = () => {
  sessionStorage.setItem('page', 'work')
  const { works, users } = useAllBase(
    useShallow((state) => ({
      works: state.works,
      users: state.users,
    })),
  )

  const tableRef = useRef(null)

  const [orders, setOrders] = useState([])
  const [workers, setWorkers] = useState([])
  const [filterList, setFilterList] = useState([])
  const [filterOrders, setFilterOrders] = useState([])
  const [isOpenContextMenu, setIsOpenContextMenu] = useState(false)
  const [isOpenModal, setIsOpenModal] = useState(false)
  const [actionButton, setActionButton] = useState(null)
  const [pos, setPos] = useState({ posX: 0, posY: 0 })

  function searchId(data, id) {
    if (id === 'user' || id === 'user_otk') {
      let mass = find(workers, function (o) {
        return o.id == data
      })
      return mass.name
    } else return data
  }

  function handleRowsWorks(event) {
    event.preventDefault()
    setIsOpenContextMenu(true)
    tableRef.current.childNodes.forEach((el) => {
      el.classList.remove('active-work')
    })
    setPos({ posX: event.clientX, posY: event.clientY })
    event.target.parentNode.classList.add('active-work')
  }

  function getOrderIsStorage(id) {
    const itemOrder = filter(works, function (o) {
      return o.id_order === id
    })
    return itemOrder
  }

  const workerUser = filter(workers, function (o) {
    return o.status !== 'otk'
  })
  const otkUser = filter(workers, function (o) {
    return o.status === 'otk'
  })

  function renderHeader(textHeader) {
    if (textHeader === 'Исполнитель' || textHeader === 'ОТК исполнитель') {
      if (textHeader === 'Исполнитель') {
        return (
          <MySelect
            titleSelect={textHeader}
            optionsList={workerUser}
            setFilterList={setFilterList}
            mask={'user'}
          />
        )
      }
      if (textHeader === 'ОТК исполнитель') {
        return (
          <MySelect
            titleSelect={textHeader}
            optionsList={otkUser}
            setFilterList={setFilterList}
            mask={'user_otk'}
          />
        )
      }
    } else return textHeader
  }

  useEffect(() => {
    setFilterOrders(orders)
    setOrders(works)
    setWorkers(users)
  }, [works, users])

  useEffect(() => {
    const storage = sessionStorage.getItem('id_order')
    if (!filterList.length || filterList[0].id === 'first') {
      if (storage !== null) {
        setFilterOrders(getOrderIsStorage(storage))
      } else setFilterOrders(orders)
    } else {
      setFilterOrders([])
      let tempArray = []
      filterList.forEach((item) => {
        let mask = null
        if (item.status === 'otk') {
          mask = 'user_otk'
        } else mask = 'user'
        const temp = filter(orders, { [mask]: item.id })
        tempArray.push(...temp)
      })
      setFilterOrders(tempArray)
    }
  }, [filterList, orders])

  return (
    <div className='wrapper_card'>
      {isOpenModal && <ModalEditWork />}
      {isOpenContextMenu && (
        <ContextMenu
          setActionButton={setActionButton}
          setIsOpenContextMenu={setIsOpenContextMenu}
          pos={pos}
        />
      )}
      {workers.length ? (
        <table>
          <thead>
            <tr>
              {worksHeader.map((nam) => (
                <th key={nam.name}>{renderHeader(nam.name)}</th>
              ))}
            </tr>
          </thead>
          <tbody ref={tableRef}>
            {filterOrders ? (
              filterOrders.map((el) => (
                <tr
                  key={el.id}
                  className='row-tab'
                  onContextMenu={handleRowsWorks}>
                  {keysCol.map((kl) => (
                    <td key={kl}>{searchId(el[kl], kl)}</td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td>Loading...</td>
              </tr>
            )}
          </tbody>
        </table>
      ) : (
        <h2>Loading...</h2>
      )}
    </div>
  )
}
