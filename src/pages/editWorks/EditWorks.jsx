import './edit_works.css'

export const EditWorks = () => {
  return (
    <div className='wrapper-edit'>
      <div>
        Основная таблица
        <div className='action-edit'>
          <label>
            Заказ №
            <input type='date' />
          </label>
          <label>
            Заказчик
            <input type='text' />
          </label>
          <label>
            Исполнитель
            <input type='text' />
          </label>
          <label>
            Тип изделия
            <input type='text' />
          </label>
          <label>
            Количество
            <input type='text' />
          </label>
          <label>
            Внутренний чертеж
            <input type='text' />
          </label>
          <label>
            Чертеж заказчика
            <input type='text' />
          </label>
          <label>
            Оплата заказчиком
            <input type='date' />
          </label>
          <label>
            Срок исполнения
            <input type='date' />
          </label>
        </div>
      </div>
      <div>
        Рабочая таблица
        <div className='action-edit'>
          <label>
            Заказ №
            <input type='text' />
          </label>
          <label>
            Дата
            <input type='date' />
          </label>
          <label>
            Количество
            <input type='text' />
          </label>
          <label>
            Исполнитель
            <input type='text' />
          </label>
          <label>
            ОТК
            <input type='text' />
          </label>
          <label>
            Дата ОТК
            <input type='date' />
          </label>
          <label>
            Годные
            <input type='text' />
          </label>
          <label>
            Условно
            <input type='text' />
          </label>
          <label>
            Брак
            <input type='text' />
          </label>
        </div>
      </div>
    </div>
  )
}
