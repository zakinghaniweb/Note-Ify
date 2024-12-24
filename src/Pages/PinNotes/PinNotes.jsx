import React, { useState } from 'react'
import PinNote from '../../Components/PinNote/PinNote'
import NoteView from '../../Components/NoteView/NoteView'
import { FaMapPin } from 'react-icons/fa6'
import { getDatabase, onValue, ref, update } from 'firebase/database'
import { useSelector } from 'react-redux'

const PinNotes = () => {
  // Firebase Vars =>
  const currentUserId = useSelector((state)=>state.User.value.uid)
  const db = getDatabase();
  // States
  const [showView,setShowView] = useState(false)
  const [cardView,setCardView] = useState([])
  const [buttonVisibility,setButtonVisibility] = useState(false)
  // Functions
  const onClickSingleNote = (cardData)=>{
    setShowView(true)
    setCardView(cardData)
  }
  const handleUnpinAll = ()=>{
        let array = []
        onValue(ref(db, 'allNotes/'), (snapshot) => {
            snapshot.forEach((item)=>{
                array.push({...item.val(),key:item.key})
            })
        });
        for (const note of array) {
            if (note.noteCreator == currentUserId) {
                update(ref(db, 'allNotes/' + note.key), {
                    notePinStatus:false
                })
            }
        }
  }
  return (
    <div className='w-full'>
      <div className="pinned-notes flex flex-wrap">
        <div className="pin-head flex justify-between items-center">
          <h2>Pinned Notes</h2>
          {
            buttonVisibility&&
            <button title="Save" onClick={handleUnpinAll} className="cursor-pointer mr-[30px] flex items-center fill-purple-400 bg-purple-950 hover:bg-purple-900 active:border active:border-purple-400 rounded-md duration-100 px-6 py-[15px]">
                <FaMapPin className='text-purple-400 font-bold'/>
                <span className="text-sm text-purple-400 font-bold pr-1 pl-1">Unpin All</span>
            </button>
          }
        </div>
        <div className="card-pinNotes flex flex-wrap">
        <PinNote setButtonVisibility={setButtonVisibility} onClickSingleNote={onClickSingleNote}/>
        </div>
      </div>
      <NoteView showview={showView} cardView={cardView} notshowview={()=>setShowView(false)}/>
    </div>
  )
}

export default PinNotes