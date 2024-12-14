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
  { name: 'Заказ', type: 'text', key_name: 'id_order' },
  { name: 'Дата', type: 'date', key_name: 'date' },
  { name: 'Кол-во', type: 'text', key_name: 'incount' },
  { name: 'Исполнитель', type: 'text', key_name: 'user' },
  { name: 'ОТК исполнитель', type: 'text', key_name: 'user_otk' },
  { name: 'Дата ОТК', type: 'date', key_name: 'date_otk' },
  { name: 'Годные', type: 'text', key_name: 'goot' },
  { name: 'Условно', type: 'text', key_name: 'no_goot' },
  { name: 'Брак', type: 'text', key_name: 'fuck' },
]

const usersHeader = [
  { name: 'Имя', type: 'text', key_name: 'name' },
  { name: 'Должность', type: 'select', key_name: 'status' },
]
export { headers, worksHeader, usersHeader }
