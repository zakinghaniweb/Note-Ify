import { FaRecycle } from 'react-icons/fa'
import TrashNote from '../../Components/TrashNote/TrashNote'
import { getDatabase, onValue, ref, remove, set } from "firebase/database";
import { IoMdClose } from 'react-icons/io';
import { useSelector } from 'react-redux';
import { useState } from 'react';

const Trash = () => {
    // States
    const [buttonVisibility,setButtonVisibility] = useState(false)
    // Delete All
    const db = getDatabase();
    const handleDeleteAll = ()=>{
        let array = []
        onValue(ref(db, 'trashNotes/'), (snapshot) => {
            snapshot.forEach((item)=>{
                array.push({...item.val(),key:item.key})
            })
        });
        for (const note of array) {
            if (note.noteCreator == currentUserId) {
                remove(ref(db, 'trashNotes/' + note.key))
            }
        }
    }
    // Recover All
    const currentUserId = useSelector((state)=>state.User.value.uid)
    const handleRestoreAll = ()=>{
        let array = []
        onValue(ref(db, 'trashNotes/'), (snapshot) => {
            snapshot.forEach((item)=>{
                array.push({...item.val(),key:item.key})
            })
        });
        for (const note of array) {
            if (note.noteCreator == currentUserId) {
                set(ref(db, 'allNotes/' + note.key), {
                    noteTitle:note.noteTitle,
                    noteDetails:note.noteDetails,
                    noteBg:note.noteBg,
                    noteTextCol:note.noteTextCol,
                    noteCreator:note.noteCreator,
                    notePinStatus:note.notePinStatus
                })
                remove(ref(db, 'trashNotes/' + note.key))
            }
        }
    }
return (
    <div className='w-full'>
        <div className="trash-notes flex flex-wrap">
        <div className="trash-head flex items-center justify-between">
        <h2>Trashed Notes</h2>
        {
            buttonVisibility&&
        <div className='flex'>
            <button onClick={handleDeleteAll} title="Save" className="cursor-pointer mr-[30px] flex items-center fill-red-400 bg-red-950 hover:bg-red-900 active:border active:border-red-400 rounded-md duration-100 px-6 py-[15px]">
                <IoMdClose className='text-red-400 font-bold'/>
                <span className="text-sm text-red-400 font-bold pr-1 pl-1">Delete All</span>
            </button>
            <button onClick={handleRestoreAll} title="Save" className="cursor-pointer mr-[30px] flex items-center fill-cyan-400 bg-cyan-950 hover:bg-cyan-900 active:border active:border-cyan-400 rounded-md duration-100 px-6 py-[15px]">
                <FaRecycle className='text-cyan-400 font-bold'/>
                <span className="text-sm text-cyan-400 font-bold pr-1 pl-1">Restore All</span>
            </button>
        </div>
        }
        </div>
        <div className="card-allNotes flex flex-wrap">
        <TrashNote setButtonVisibility={setButtonVisibility}/>
        </div>
    </div>
    </div>
)
}

export default Trash