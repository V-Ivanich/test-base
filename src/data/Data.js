const headers = [
  { name: '№ Заказа', type: 'date', key_name: 'id_order' },
  { name: 'Заказчик', type: 'text', key_name: 'order' },
  { name: 'Исполнитель', type: 'text', key_name: 'ispolnitel' },
  { name: 'Тип изделия', type: 'text', key_name: 'type_item' },
  { name: 'Количество шт.', type: 'text', key_name: 'coint' },
  { name: 'Внутр. чертеж', type: 'text', key_name: 'inside' },
  { name: 'Чертеж заказчика', type: 'text', key_name: 'outside' },
  { name: 'Оплата заказчиком', type: 'date', key_name: 'date_cashe' },
  { name: 'Срок исполнения', type: 'date', key_name: 'date_out' },
  { name: 'Завершение', type: 'checkbox', key_name: 'active' },
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
