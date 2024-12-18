import { useEffect, useState } from 'react'
import './SingleNote.css'
import { getDatabase, ref, onValue } from "firebase/database";
import { useSelector } from 'react-redux';

const SingleNote = () => {
// firebase vars
const currentUserId = useSelector((state)=>state.User.value.uid)
const db = getDatabase();
// State Datas
    const [allNotes,setAllNotes] = useState([])
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
return (
    <div className='flex flex-wrap'>
        {
            allNotes.map((item)=>{
                return(
                <div className='single-note' style={{background:item.noteBg}} key={item.noteTitle}>
                    <h2 className='noteTitle' style={{color:item.noteTextCol}}>{item.noteTitle}</h2>
                    <p className='noteData' style={{color:item.noteTextCol}}>{item.noteDetails}</p>
                </div>
                )
            })
        }
    </div>
)
}

export default SingleNote