import './context-menu.css'

const ContextMenu = ({ setActionButton, setIsOpenContextMenu, pos }) => {
  const { posX, posY } = pos
  const handleClickBtnContext = (text) => {
    setActionButton(text)
    setIsOpenContextMenu(false)
  }

  return (
    <div
      className='context-container'
      style={{ left: `${posX - 120}` + 'px', top: `${posY - 50}` + 'px' }}>
      <button
        className='btn-context'
        onClick={() => handleClickBtnContext('add')}>
        Добавить запись
      </button>
      <button
        className='btn-context'
        onClick={() => handleClickBtnContext('edit')}>
        Изменить запись
      </button>
      <button
        className='btn-context'
        onClick={() => handleClickBtnContext('delete')}>
        Удалить запись
      </button>
      <button
        className='btn-context'
        onClick={() => handleClickBtnContext('cancel')}>
        Отменить
      </button>
    </div>
  )
}

export { ContextMenu }
