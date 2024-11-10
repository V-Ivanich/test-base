async function EditOrder(id, patch, editOrder) {
  try {
    const response = await fetch(`http://127.0.0.1:3001/${patch}/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(editOrder),
      Headers: {
        'Content-Type': 'application/json',
      },
    })
    const data = await response.json()
    console.log(data)

    if (!response.ok) {
      throw new Error('Проблема с сервером, попробуйте позже.')
    }
  } catch (error) {
    console.log(error)
  }
}

export { EditOrder }
