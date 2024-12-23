import React, { useState } from 'react'
import { IoClose } from 'react-icons/io5'
import './NoteView.css'
import { useEffect } from 'react'

const NoteView = ({showview,notshowview,cardView}) => {
  return (
        <div id='view' className={`${showview?"top-0 opacity-[1]":"top-[-100%] opacity-0"} transition-all duration-500`}>
            <div className="noteview">
                <div className="noteviewRow">
                    <div className="noteviewHead">
                        <h1></h1>
                        <button onClick={notshowview}><IoClose/></button>
                    </div>
                    <div className="noteviewBody">
                        <p>whaioejfijefiejfiojefoijeof</p>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default NoteView