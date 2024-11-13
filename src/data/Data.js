const headers = [
  { name: '№ Заказа', type: 'date' },
  { name: 'Заказчик', type: 'text' },
  { name: 'Исполнитель', type: 'text' },
  { name: 'Тип изделия', type: 'text' },
  { name: 'Количество шт.', type: 'text' },
  { name: 'Внутр. чертеж', type: 'text' },
  { name: 'Чертеж заказчика', type: 'text' },
  { name: 'Оплата заказчиком', type: 'date' },
  { name: 'Срок исполнения', type: 'date' },
  { name: 'Завершение', type: 'checkbox' },
]

const worksHeader = [
  { name: 'Заказ', type: 'text' },
  { name: 'Дата', type: 'date' },
  { name: 'Кол-во', type: 'text' },
  { name: 'Исполнитель', type: 'text' },
  { name: 'ОТК исполнитель', type: 'text' },
  { name: 'Дата ОТК', type: 'date' },
  { name: 'Годные', type: 'text' },
  { name: 'Условно', type: 'text' },
  { name: 'Брак', type: 'text' },
]

export { headers, worksHeader }
