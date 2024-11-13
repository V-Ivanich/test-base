import { FaCheck } from 'react-icons/fa6'
import { useState } from 'react'
import './my-checkbox.css'

function MyCheck() {
  const [enabled, setEnabled] = useState(false)

  const handleCheck = () => {
    setEnabled(!enabled)
  }

  return (
    <div className='button-check' onClick={handleCheck}>
      <button className='btn-check'>
        {enabled ? <FaCheck className='check-svg' /> : ''}
      </button>
    </div>
  )
}

export { MyCheck }
