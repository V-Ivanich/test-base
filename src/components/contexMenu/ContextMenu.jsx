import './context-menu.css'

export const ContextMenu = ({
  position,
  setActionBtn,
  setIsOpenContext,
  temlateBtn,
}) => {
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
