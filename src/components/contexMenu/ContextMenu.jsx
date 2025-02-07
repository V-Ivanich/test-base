import './context-menu.css'

const temlateBtn = [
  { name: 'Добавить', value: 'add' },
  { name: 'Изменить', value: 'edit' },
  { name: 'Удалить', value: 'delete' },
]

export const ContextMenu = ({ position, setActionBtn, setIsOpenContext }) => {
  const { x, y } = position

  return (
    <div
      className='wrapper-context-container'
      onClick={() => setIsOpenContext(false)}>
      <div
        className='wrapper-context-menu'
        style={{ top: y, left: x }}
        onClick={(e) => e.stopPropagation()}>
        <div className='context-container'>
          {temlateBtn.map((b) => (
            <button
              className='btn-user'
              data-val={b.value}
              key={b.name}
              onClick={() => setActionBtn(b.value)}>
              {b.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
