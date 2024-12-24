import React, { useState } from 'react'
import SingleNote from '../../Components/SingleNote/SingleNote'
import { IoMdClose } from 'react-icons/io'
import { FaRecycle, FaTrashAlt } from 'react-icons/fa'
import { getDatabase, onValue, ref, remove, set } from 'firebase/database'
import { useSelector } from 'react-redux'

const AllNotes = () => {
    // Firebase Vars =>
  const currentUserId = useSelector((state)=>state.User.value.uid)
  const db = getDatabase();
  // State =>
  const [buttonVisibility,setButtonVisibility] = useState(false)
  // Functions =>
  const handleRemoveAll = ()=>{
    let array = []
    onValue(ref(db, 'allNotes/'), (snapshot) => {
        snapshot.forEach((item)=>{
            array.push({...item.val(),key:item.key})
        })
    });
    for (const note of array) {
        if (note.noteCreator == currentUserId) {
            set(ref(db, 'trashNotes/' + note.key), {
                noteTitle:note.noteTitle,
                noteDetails:note.noteDetails,
                noteBg:note.noteBg,
                noteTextCol:note.noteTextCol,
                noteCreator:note.noteCreator,
                notePinStatus:note.notePinStatus
            })
            remove(ref(db, 'allNotes/' + note.key))
        }
    }
  }
  return (
    <div className='w-full'>
        <div className="all-notes flex flex-wrap">
        <div className="all-head flex items-center justify-between">
        <h2>All Notes</h2>
        {buttonVisibility&&
            <button onClick={handleRemoveAll} title="Save" className="cursor-pointer mr-[30px] flex items-center fill-red-400 bg-red-950 hover:bg-red-900 active:border active:border-red-400 rounded-md duration-100 px-6 py-[15px]">
                <FaTrashAlt className='text-red-400 font-bold'/>
                <span className="text-sm text-red-400 font-bold pr-1 pl-1">Remove All</span>
            </button>
        }
        </div>
        <div className="card-allNotes flex flex-wrap">
        <SingleNote setButtonVisibility={setButtonVisibility}/>
        </div>
      </div>
    </div>
  )
}

export default AllNotes