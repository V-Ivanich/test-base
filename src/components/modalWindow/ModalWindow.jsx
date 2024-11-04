import { headers, worksHeader } from '../../data/Data'
import './modal_window.css'

const ModalWindow = () => {
  return (
    <div className='modal-window'>
      <div className='action-btn'>
        <button>Отмена</button>
        <button>Привязать рабочую</button>
        <button>Сохранить</button>
      </div>
      <div className='title-header'>
        {headers.map((hed) => (
          <div className='colons' key={hed}>
            {hed}
            <input type='text' />
          </div>
        ))}
      </div>
    </div>
  )
}

export { ModalWindow }
