import { FaPlus } from "react-icons/fa"
import "./Home.css"
import PopUp from "../../Components/PopUp/PopUp"
import { useState } from "react"
import SingleNote from "../../Components/SingleNote/SingleNote"
import PinNote from "../../Components/PinNote/PinNote"
import TrashNote from "../../Components/TrashNote/TrashNote"
const Home = () => {
  const dummySetButtonVisibility = () => {
    // Nothing Skip It
  };
  const [showPop,setShowPop] =  useState(false)
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
        <PinNote/>
        </div>
      </div>
      <div className="all-notes flex flex-wrap">
        <div className="all-head">
          <h2>All Notes</h2>
        </div>
        <div className="card-allNotes flex flex-wrap">
        <SingleNote/>
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
    </div>
  )
}

export default Home