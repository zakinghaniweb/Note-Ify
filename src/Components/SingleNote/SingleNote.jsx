import { useEffect, useState } from 'react'
import './SingleNote.css'
import { getDatabase, ref, onValue, update, set, remove } from "firebase/database";
import { useSelector } from 'react-redux';
import { SlOptionsVertical } from 'react-icons/sl';
import PopUp from '../PopUp/PopUp';
import NoteView from '../NoteView/NoteView';

const SingleNote = ({onClickSingleNote}) => {
// Firebase Vars
const currentUserId = useSelector((state)=>state.User.value.uid)
const db = getDatabase();
// State Datas
    const [allNotes,setAllNotes] = useState([])
    const [optionVisibility,setOptionVisibility] = useState(false)
    const [uniqueCardKey,setUniqueCardKey] = useState()
    const [showPopup,setShowPopup] = useState(false)
    const [editData,setEditData] = useState([])
    const [viewData,setViewData] = useState([])
    const [popColorCode,setPopColorCode] = useState("1")
// Functions ==>
    useEffect(() => {
        onValue(ref(db, 'allNotes/'), (snapshot) => {
            const array = []
            snapshot.forEach((item)=>{
                if(item.val().noteCreator == currentUserId){
                    array.push({...item.val(),key:item.key})
                }
            })
            setAllNotes(array)
        });
    }, [])
    const handlePin = (currentCard)=>{
        update(ref(db, 'allNotes/' + currentCard.key), {
            notePinStatus:true
        })
    }
    const handleUnPin = (currentCard)=>{
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
    const handleNoteView = (currentCard)=>{
        setViewData(currentCard)
        onClickSingleNote(currentCard)
    }
return (
    <div className='flex flex-wrap'>
        {
            allNotes.map((item)=>{
                return(
                <div className='single-note' onClick={()=>handleNoteView(item)} style={{background:item.noteBg}} key={item.key}>
                    <h2 className='noteTitle' style={{color:item.noteTextCol}}>{item.noteTitle}</h2>
                    <p className='noteData' style={{color:item.noteTextCol}}>{item.noteDetails}</p>
                    <div className="singleCard-options" onClick={()=>{setOptionVisibility(!optionVisibility),setUniqueCardKey(item.key)}}>
                    <SlOptionsVertical className='text-white' />
                    {
                    optionVisibility&& uniqueCardKey == item.key&&                  
                        <div className="option">
                            {
                                item.notePinStatus?
                                <li onClick={()=>handleUnPin(item)}><button>Unpin</button></li>
                                :
                                <li onClick={()=>handlePin(item)}><button>Pin</button></li>
                            }
                            <li onClick={()=>handleRemove(item)}><button>Remove</button></li>
                            <li onClick={()=>handleEdit(item)}><button>Edit</button></li>
                        </div>
                    }
                    </div>
                </div>
                )
            })
        }
        <PopUp popColorToken={popColorCode} showpopup={showPopup} popclose={()=>{setShowPopup(false),setEditData("")}} popEditData={editData}/>
    </div>
)
}

export default SingleNote