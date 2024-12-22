import { useSelector } from 'react-redux';
import './PinNote.css'
import { getDatabase, onValue, ref,set,remove, update } from 'firebase/database';
import { useEffect, useState } from 'react';
import { SlOptionsVertical } from 'react-icons/sl';
import PopUp from '../PopUp/PopUp';

const PinNote = () => {
// firebase vars
const currentUserId = useSelector((state)=>state.User.value.uid)
const db = getDatabase();
// State Datas
    const [PinNotes,setPinNotes] = useState([])
    const [optionVisibility,setOptionVisibility] = useState(false)
    const [uniqueCardKey,setUniqueCardKey] = useState()
    const [showPopup,setShowPopup] = useState(false)
    const [editData,setEditData] = useState([])
// Functions ==>
    useEffect(() => {
        onValue(ref(db, 'allNotes/'), (snapshot) => {
            const array = []
            snapshot.forEach((item)=>{
                if(item.val().noteCreator == currentUserId && item.val().notePinStatus == true){
                    array.push({...item.val(),key:item.key})
                }
            })
            setPinNotes(array)
        });
    }, [])
    const handlePin = (currentCard)=>{
        update(ref(db, 'allNotes/' + currentCard.key), {
            notePinStatus:false
        })
    }
    const handleRemove = (currentCard)=>{
        set(ref(db, 'trashNotes/' + currentCard.key), {
            noteTitle:currentCard.noteTitle,
            noteDetails:currentCard.noteDetails,
            noteBg:currentCard.noteBg,
            noteTextCol:currentCard.noteTextCol,
            noteCreator:currentCard.noteCreator,
            notePinStatus:currentCard.notePinStatus
        })
        remove(ref(db, 'allNotes/' + currentCard.key))
    }
    const handleEdit = (currentCard)=>{
        setShowPopup(true)
        setEditData(currentCard)
    }
return (
    <div className='flex flex-wrap'>
        {
            PinNotes.map((item)=>{
                return(
                <div className='single-note' style={{background:item.noteBg}} key={item.noteTitle}>
                    <h2 className='noteTitle' style={{color:item.noteTextCol}}>{item.noteTitle}</h2>
                    <p className='noteData' style={{color:item.noteTextCol}}>{item.noteDetails}</p>
                    <div className="singleCard-options" onClick={()=>{setOptionVisibility(!optionVisibility),setUniqueCardKey(item.key)}}>
                    <SlOptionsVertical className='text-white' />
                    {
                    optionVisibility&& uniqueCardKey == item.key&&                  
                        <div className="option">
                            <li onClick={()=>handlePin(item)}><button>Unpin</button></li>
                            <li onClick={()=>handleRemove(item)}><button>Remove</button></li>
                            <li onClick={()=>handleEdit(item)}><button>Edit</button></li>
                        </div>
                    }
                    </div>
                </div>
                )
            })
        }
        <PopUp showpopup={showPopup} popclose={()=>{setShowPopup(false),setEditData("")}} popEditData={editData}/>
    </div>
)
}

export default PinNote