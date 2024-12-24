import { FaPlus } from "react-icons/fa"
import "./Home.css"
import PopUp from "../../Components/PopUp/PopUp"
import { useState } from "react"
import SingleNote from "../../Components/SingleNote/SingleNote"
import PinNote from "../../Components/PinNote/PinNote"
import TrashNote from "../../Components/TrashNote/TrashNote"
import NoteView from "../../Components/NoteView/NoteView"
const Home = () => {
  const [showPop,setShowPop] =  useState(false)
  const [showView,setShowView] = useState(false)
  const [cardView,setCardView] = useState([])
  const dummySetButtonVisibility = () => {
    // Nothing Skip It
  };
  const onClickSingleNote = (cardData)=>{
    setShowView(true)
    setCardView(cardData)
  }
  return (
    <div className="w-full h-full">
      <div className="card-notes flex flex-wrap">
        <div className="addnote" onClick={()=>setShowPop(!showPop)}>
          <h2>Add <FaPlus/></h2>
        </div>
      </div>
      <div className="pinned-notes flex flex-wrap">
        <div className="pin-head">
          <h2>Pinned Notes</h2>
        </div>
        <div className="card-pinNotes flex flex-wrap">
        <PinNote onClickSingleNote={onClickSingleNote} setButtonVisibility={dummySetButtonVisibility}/>
        </div>
      </div>
      <div className="all-notes flex flex-wrap">
        <div className="all-head">
          <h2>All Notes</h2>
        </div>
        <div className="card-allNotes flex flex-wrap">
        <SingleNote onClickSingleNote={onClickSingleNote} setButtonVisibility={dummySetButtonVisibility} />
        </div>
      </div>
      <div className="trash-notes flex flex-wrap">
        <div className="trash-head">
          <h2>Trashed Notes</h2>
        </div>
        <div className="card-allNotes flex flex-wrap">
        <TrashNote setButtonVisibility={dummySetButtonVisibility} />
        </div>
      </div>
        <PopUp showpopup={showPop} popclose={()=>setShowPop(false)}/>
        <NoteView showview={showView} cardView={cardView} notshowview={()=>setShowView(false)}/>
    </div>
  )
}

export default Home