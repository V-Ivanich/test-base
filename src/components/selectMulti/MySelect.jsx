import './my-select.css'
import img_up from '../../images/up.png'
import img_down from '../../images/down.png'
import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

const MySelect = (props) => {
  const { placeholder, optionsList, mask, setFilterList, mode } = props
  const [sessionList, setSessionList] = useState(optionsList)
  const [isOpen, setIsOpen] = useState(false)
  const [getPlaceholder, setPlaceholder] = useState(placeholder)

  const rerenderOptionList = () => {
    const rewriteOptionsList = optionsList.map((item) => {
      return { ...item, active: false }
    })

    rewriteOptionsList.unshift({
      id: 'first',
      name: 'Все',
      active: true,
      status: null,
    })
    setSessionList(rewriteOptionsList)
  }

  const handleClickPlaceholder = (e) => {
    if (e.target.nodeName === 'UL') return
    sessionStorage.removeItem('id_order')

    if (isOpen) {
      const filterUser = sessionList.filter((user) => user.active === true)
      const idUsers = filterUser.map((elem) => {
        return { id: elem.id, status: elem.status }
      })
      setFilterList(idUsers)
    }
    setIsOpen(!isOpen)
  }

  const handleOptionsClick = (event) => {
    event.stopPropagation()
    const id = event.target.dataset.value
    if (id === 'first') {
      const resetAll = sessionList.map((item) => {
        if (item.id === 'first') {
          return { ...item, active: true }
        } else
          return {
            ...item,
            active: false,
          }
      })
      setSessionList(resetAll)
      sessionStorage.setItem(`list_${mask}`, JSON.stringify(resetAll))
    } else {
      const activeUser = sessionList.map((elem) => {
        if (elem.id === 'first') {
          return { ...elem, active: false }
        }
        if (elem.id === id) {
          return { ...elem, active: !elem.active }
        }
        return elem
      })
      const checkedItems = activeUser.filter((el) => el.active === true)
      if (
        checkedItems.length === sessionList.length - 1 ||
        checkedItems.length === 0
      ) {
        const resetAll = sessionList.map((item) => {
          if (item.id === 'first') {
            return { ...item, active: true }
          } else {
            return { ...item, active: false }
          }
        })
        setSessionList(resetAll)
        sessionStorage.setItem(`list_${mask}`, JSON.stringify(resetAll))
        return
      }

      setSessionList(activeUser)
      sessionStorage.setItem(`list_${mask}`, JSON.stringify(activeUser))
    }
  }

  useEffect(() => {
    const storage = sessionStorage.getItem(`list_${mask}`)
    if (storage) {
      setSessionList(JSON.parse(storage))
    } else rerenderOptionList()
  }, [])

  return (
    <div className='wrapper-select' onClick={handleClickPlaceholder}>
      <label className='selected-text'>{getPlaceholder}</label>
      {!isOpen ? (
        <img
          src={img_down}
          alt='images'
          width={14}
          style={{ filter: 'invert(75%)', marginLeft: 4 }}
        />
      ) : (
        <img
          src={img_up}
          alt='images'
          width={14}
          style={{ filter: 'invert(75%)', marginLeft: 4 }}
        />
      )}
      <ul className={isOpen ? 'select-options show' : 'select-options'}>
        {sessionList.map((option) => (
          <li
            key={option.id}
            data-value={option.id}
            className={option.active ? 'btn select-active' : 'btn'}
            onClick={handleOptionsClick}>
            {option.name}
          </li>
        ))}
      </ul>
    </div>
  )
}

MySelect.propTypes = {
  placeholder: PropTypes.string,
  mask: PropTypes.string,
  optionsList: PropTypes.array.isRequired,
  setFilterList: PropTypes.func,
  mode: PropTypes.string,
}

export { MySelect }
