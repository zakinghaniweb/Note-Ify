import React from 'react'
import SingleNote from '../../Components/SingleNote/SingleNote'

const AllNotes = () => {
  return (
    <div className='w-full'>
        <div className="all-notes flex flex-wrap">
        <div className="all-head">
        <h2>All Notes</h2>
        </div>
        <div className="card-allNotes flex flex-wrap">
        <SingleNote/>
        </div>
      </div>
    </div>
  )
}

export default AllNotes