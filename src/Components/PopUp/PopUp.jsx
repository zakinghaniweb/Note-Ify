import { IoClose } from 'react-icons/io5'
import './PopUp.css'
import { IoIosColorPalette } from 'react-icons/io'
import { FaArrowDown, FaEyeDropper } from 'react-icons/fa'
import { useEffect, useState } from 'react'
import { getDatabase, push, ref, set, update } from "firebase/database";
import { MdFormatColorText } from 'react-icons/md'
import { useSelector } from 'react-redux'

const PopUp = ({showpopup, popclose, popclear, popEditData}) => {
    // Redux =>
    const currentUserId = useSelector((state)=>state.User.value.uid)
    // Firebase Vars =>
    const db = getDatabase();
    // States =>
    const [noteData,setNoteData] = useState({noteName: "",noteDetails: "",noteError: ""})
    const [popUpColor,setPopUpColor] = useState("#FFFFFF")
    const [popUpText,setPopUpText] = useState("#000000")
    const [showPopup,setShowPopup] = useState(false)
    const [editData,setEditData] = useState([])
    // Functions =>
    const handleSave = ()=>{
        if (!noteData.noteName) {
            setNoteData((prev)=>({...prev,noteError:"Your Note Must Have A Title"}))
        }
        else if (!noteData.noteDetails) {
            setNoteData((prev)=>({...prev,noteError:"Please Enter Some Note"}))
        }
        else{
            set(push(ref(db, 'allNotes/')), {
                noteTitle:noteData.noteName,
                noteDetails:noteData.noteDetails,
                noteBg:popUpColor,
                noteTextCol:popUpText,
                noteCreator:currentUserId,
                notePinStatus:false
            });
            popclose()
            setNoteData((prev)=>({...prev,noteName:""}))
            setNoteData((prev)=>({...prev,noteDetails:""}))
            setNoteData((prev)=>({...prev,noteError:""}))
            setPopUpColor("#FFFFFF")
            setPopUpText("#000000")
        }
    }
    const handleEdit = (currentCardKey)=>{
        if (!noteData.noteName) {
            setNoteData((prev)=>({...prev,noteError:"Your Note Must Have A Title"}))
        }
        else if (!noteData.noteDetails) {
            setNoteData((prev)=>({...prev,noteError:"Please Enter Some Note"}))
        }
        else{
            update(ref(db, 'allNotes/' + currentCardKey), {
                noteTitle:noteData.noteName,
                noteDetails:noteData.noteDetails,
                noteBg:popUpColor,
                noteTextCol:popUpText,
            });
            popclose()
            setNoteData((prev)=>({...prev,noteName:""}))
            setNoteData((prev)=>({...prev,noteDetails:""}))
            setNoteData((prev)=>({...prev,noteError:""}))
            setPopUpColor("#FFFFFF")
            setPopUpText("#000000")
        }
    }
    // useEffect(() => {
    //     if (localStorage.getItem("mode") == "dark") {
    //         setPopUpColor("#000")
    //     }
    //     else{
    //         setPopUpColor("#FFF")
    //     }
    // }, [localStorage.getItem("mode")])
    useEffect(()=>{
        if (popEditData) {
            setNoteData((prev)=>({
                ...prev,
                noteName:popEditData.noteTitle,
                noteDetails:popEditData.noteDetails
            }))
            setPopUpColor(popEditData.noteBg)
            setPopUpText(popEditData.noteTextCol)
        }
    },[popEditData])
return (
    <div id='popup' className={`${showpopup?'top-0 opacity-[1]':'top-[-100%] opacity-0'} transition-all duration-500`}>
        <div className="noteform" style={{background:popUpColor}}>
            <div className="noteformrow">
                <div className="formHead flex justify-between" style={{borderColor:popUpText}}>
                    <h2 style={{color:popUpText}}>
                        {
                            popEditData?
                            "Edit Note"
                            :
                            "Add Note"
                        }
                    </h2>
                    <button className='popupclose' onClick={popclose}><IoClose/></button>
                </div>
                <div className="formBody">
                    <h2 style={{color:popUpText}}>Note Name</h2>
                    <input value={noteData.noteName} style={{color:popUpText}} type="text" onChange={(e)=>{setNoteData((prev)=>({...prev,noteName:e.target.value})),setNoteData((prev)=>({...prev,noteError:""}))}} className='noteName'/>
                    <h2 style={{color:popUpText}} className='mt-5'>Note Details</h2>
                    <textarea value={noteData.noteDetails} style={{color:popUpText}} className="noteDetails" onChange={(e)=>{setNoteData((prev)=>({...prev,noteDetails:e.target.value})),setNoteData((prev)=>({...prev,noteError:""}))}}></textarea>
                    <p className="name-error text-red-600 font-bold mt-2">{noteData.noteError}</p>
                </div>
                <div className="form-bottom flex justify-between mt-[20px]">
                    <div className="color-palette">
                    <div className="colors">
                        <IoIosColorPalette className='text-3xl text-gray-500' />
                        <button onClick={()=>setPopUpColor("#FF8383")} className="single-color bg-[#FF8383]"></button>
                        <button onClick={()=>setPopUpColor("#FFF574")} className="single-color bg-[#FFF574]"></button>
                        <button onClick={()=>setPopUpColor("#A1D6CB")} className="single-color bg-[#A1D6CB]"></button>
                        <button onClick={()=>setPopUpColor("#A19AD3")} className="single-color bg-[#A19AD3]"></button>
                        <label className="single-color bg-black text-white" htmlFor='color'><FaEyeDropper /></label>
                        <input value={popUpColor} onChange={(e)=>setPopUpColor(e.target.value)} type="color" className="!bg-transparent !shadow-none" id='color'/>
                    </div>
                    <div className="colors mt-[10px]">
                        <MdFormatColorText className='text-3xl text-gray-500' />
                        <button onClick={()=>setPopUpText("#000000")} className="single-color bg-[#000000]"></button>
                        <button onClick={()=>setPopUpText("#FFFFFF")} className="single-color bg-[#FFFFFF]"></button>
                        <label className="single-color bg-black text-white" htmlFor='colorText'><FaEyeDropper /></label>
                        <input value={popUpText} onChange={(e)=>setPopUpText(e.target.value)} type="color" className="!bg-transparent !shadow-none" id='colorText'/>
                    </div>
                    </div>
                    <div className="saveNote">
                        {
                            popEditData?
                            <button onClick={()=>handleEdit(popEditData.key)}>Edit <FaArrowDown/></button>
                            :
                            <button onClick={handleSave}>Save <FaArrowDown/></button>
                        }
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default PopUp