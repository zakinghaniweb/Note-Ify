import { useSelector } from 'react-redux';
import './TrashNote.css'
import { getDatabase, onValue, ref, remove, set, update } from 'firebase/database';
import { useEffect, useState } from 'react';
import { SlOptionsVertical } from 'react-icons/sl';

const TrashNote = ({setButtonVisibility}) => {
    // firebase vars
    const currentUserId = useSelector((state)=>state.User.value.uid)
    const db = getDatabase();
// State Datas
    const [trashNotes,setTrashNotes] = useState([])
    const [optionVisibility,setOptionVisibility] = useState(false)
    const [uniqueCardKey,setUniqueCardKey] = useState()
    useEffect(() => {
        onValue(ref(db, 'trashNotes/'), (snapshot) => {
            const array = []
            snapshot.forEach((item)=>{
                if(item.val().noteCreator == currentUserId){
                    array.push({...item.val(),key:item.key})
                }
            })
            setTrashNotes(array)
        });
    }, [])
    const handleRestore = (currentCard)=>{
        set(ref(db, 'allNotes/' + currentCard.key), {
            noteTitle:currentCard.noteTitle,
            noteDetails:currentCard.noteDetails,
            noteBg:currentCard.noteBg,
            noteTextCol:currentCard.noteTextCol,
            noteCreator:currentCard.noteCreator,
            notePinStatus:currentCard.notePinStatus
        })
    remove(ref(db, 'trashNotes/' + currentCard.key))
    }
    const handleDelete = (currentCard)=>{
        remove(ref(db, 'trashNotes/' + currentCard.key))
    }
    if(trashNotes.length == 0){
        setButtonVisibility(false)
    } else{
        setButtonVisibility(true)
    }
  return (
    <div className='w-full flex flex-wrap'>
        {
            trashNotes.map((item)=>{
                return(
                <div className='single-note' style={{background:item.noteBg}} key={item.noteTitle}>
                    <h2 className='noteTitle' style={{color:item.noteTextCol}}>{item.noteTitle}</h2>
                    <p className='noteData' style={{color:item.noteTextCol}}>{item.noteDetails}</p>
                    <div className="singleCard-options" onClick={()=>{setOptionVisibility(!optionVisibility),setUniqueCardKey(item.key)}}>
                    <SlOptionsVertical className='text-white' />
                    {
                    optionVisibility&& uniqueCardKey == item.key&&                  
                        <div className="option">
                            <li onClick={()=>handleRestore(item)}><button>Restore</button></li>
                            <li onClick={()=>handleDelete(item)}><button>Delete</button></li>
                        </div>
                    }
                    </div>
                </div>
                )
            })
        }
    </div>
  )
}

export default TrashNote