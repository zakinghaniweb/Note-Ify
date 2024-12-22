import React from 'react'
import PinNote from '../../Components/PinNote/PinNote'

const PinNotes = () => {
  return (
    <div className='w-full'>
      <div className="pinned-notes flex flex-wrap">
        <div className="pin-head">
          <h2>Pinned Notes</h2>
        </div>
        <div className="card-pinNotes flex flex-wrap">
        <PinNote/>
        </div>
      </div>
    </div>
  )
}

export default PinNotes