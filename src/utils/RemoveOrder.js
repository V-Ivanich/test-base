async function RemoveOrder({ idData, patch }) {
  try {
    const res = await fetch(`http://127.0.0.1:3001/${patch}/${idData}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (!res.ok) {
      throw new Error('Проблема с сервером, попробуйте позже.')
    }
  } catch (error) {
    console.log(error)
  }
}

export { RemoveOrder }
