async function CreateOrder({ order, patch }) {
  try {
    const response = await fetch(`http://127.0.0.1:3001/${patch}`, {
      method: 'POST',
      body: JSON.stringify(order),
      Headers: {
        'Content-Type': 'application/json',
      },
    })
    console.log(response)
  } catch (error) {
    console.log(error)
  }
}

export { CreateOrder }
