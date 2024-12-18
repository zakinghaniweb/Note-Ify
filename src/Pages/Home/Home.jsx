import { FaPlus } from "react-icons/fa"
import "./Home.css"
import PopUp from "../../Components/PopUp/PopUp"
import { useState } from "react"
import SingleNote from "../../Components/SingleNote/SingleNote"


const Home = () => {
  const [showPop,setShowPop] =  useState(false)
  return (
    <div className="w-full h-full">
      <div className="card-notes flex flex-wrap">
        <div className="addnote" onClick={()=>setShowPop(!showPop)}>
          <h2>Add <FaPlus/></h2>
        </div>
        <SingleNote/>
      </div>
        <PopUp showpopup={showPop} popclose={()=>setShowPop(false)}/>
    </div>
  )
}

export default Home