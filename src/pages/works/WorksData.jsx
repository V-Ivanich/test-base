import { worksHeader } from '../../data/Data'
import { useEffect, useState, useRef } from 'react'
import { useAllBase } from '../../store/Store'
import { useShallow } from 'zustand/shallow'
import { MySelect } from '../../components/selectMulti/MySelect'
import { ContextMenu } from '../../components/contexMenu/ContextMenu'
import { MyModal } from '../../components/modalWindow/ModalWindow'
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

const temlateBtn = [
  { name: 'Добавить', value: 'add' },
  { name: 'Изменить', value: 'edit' },
  { name: 'Удалить', value: 'delete' },
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
  const [dataGet, setDataGet] = useState([])
  const [workers, setWorkers] = useState([])
  const [filterList, setFilterList] = useState([])
  const [filterOrders, setFilterOrders] = useState([])
  const [isOpenContextMenu, setIsOpenContextMenu] = useState(false)
  const [isOpenModal, setIsOpenModal] = useState(false)
  const [actionButton, setActionButton] = useState(null)
  const [selectionByContext, setSelectionByContext] = useState({})
  const [pos, setPos] = useState({ x: 0, y: 0 })

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
    setActionButton('')
    setPos({ x: event.clientX, y: event.clientY })
    const IdSelected = event.target.parentNode.firstElementChild.innerText
    setSelectionByContext(find(works, ['id_order', IdSelected]))
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
            placeholder={textHeader}
            optionsList={workerUser}
            setFilterList={setFilterList}
            mode='multi'
            mask={'user'}
          />
        )
      }
      if (textHeader === 'ОТК исполнитель') {
        return (
          <MySelect
            placeholder={textHeader}
            optionsList={otkUser}
            setFilterList={setFilterList}
            mode='multi'
            templateForm={worksHeader}
            mask={'user_otk'}
          />
        )
      }
    } else return textHeader
  }

  useEffect(() => {
    switch (actionButton) {
      case 'add':
        setIsOpenModal(true)
        setSelectionByContext({})
        setIsOpenContextMenu(false)
        break
      case 'delete':
        setIsOpenModal(true)
        setIsOpenContextMenu(false)

        break
      case 'edit':
        setIsOpenModal(true)
        setIsOpenContextMenu(false)

        break
      default:
        setIsOpenContextMenu(false)
        break
    }
  }, [actionButton])

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
      {isOpenContextMenu && (
        <ContextMenu
          position={pos}
          setActionBtn={setActionButton}
          setIsOpenContext={setIsOpenContextMenu}
          temlateBtn={temlateBtn}
        />
      )}
      {isOpenModal && (
        <MyModal
          // isOpenModal={isOpenModal}
          setIsOpenModal={setIsOpenModal}
          templateForm={worksHeader}
          datas={setDataGet}
          editData={selectionByContext}
          users={users}
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
