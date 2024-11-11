import './context-menu.css'

const ContextMenu = () => {
  return (
    <div className='context-container'>
      <button className='btn-context'>Добавить запись</button>
      <button className='btn-context'>Изменить запись</button>
      <button className='btn-context'>Удалить запись</button>
    </div>
  )
}

export { ContextMenu }
