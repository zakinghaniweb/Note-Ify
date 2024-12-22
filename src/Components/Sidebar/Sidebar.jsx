import { NavLink } from 'react-router-dom'
import './Sidebar.css'
import { FaPen,FaHome, FaSun, FaMoon, FaTrash } from 'react-icons/fa'
import { MdPushPin } from 'react-icons/md'
import { useEffect, useState } from 'react'

const Sidebar = () => {
      // ========== state
      const [toggleValue, setToggleValue] = useState(false);
      // ========== saving the mode when user  visitor
      useEffect(() => {
        const savedMode = localStorage.getItem("mode") || "light";
        localStorage.setItem("mode", savedMode);
        document
          .querySelector("html")
          .classList.toggle("dark", savedMode === "dark");
          console.log(savedMode)
      }, []);
      // ========== changing the mode on toggle
      const handelMode = () => {
        if (localStorage.getItem("mode") == "light") {
          localStorage.setItem("mode", "dark");
          document.querySelector("html").classList.add("dark");
          setToggleValue(!toggleValue);
        } else {
          localStorage.setItem("mode", "light");
          document.querySelector("html").classList.remove("dark");
          setToggleValue(!toggleValue);
        }
      };
  return (
    <section id='sidebar' className='dark:!bg-slate-200'>
        <div className="sidebar-head">
            <h2>Notes</h2>
            {localStorage.getItem("mode") == "dark" ? (
            <button className='themeMode !bg-black !text-white hover:!text-black hover:!bg-white' onClick={handelMode}><FaMoon/></button>
        ) : (
          <button className='themeMode' onClick={handelMode}><FaSun/></button>
        )}
        </div>
        <div className="sidebar-menu">
            <ul>
              <li>
              <NavLink to="/home" className={({ isActive })=>isActive ? "!bg-[#004f8ba0]" : "!bg-[#02253f62] dark:!bg-[#02253f2e]"}>
                <FaHome /> Home
              </NavLink>
              </li>
              <li>
              <NavLink to="/allnotes" className={({ isActive })=>isActive ? "!bg-[#004f8ba0]" : "!bg-[#02253f62] dark:!bg-[#02253f2e]"}>
                <FaPen /> All Notes
              </NavLink>
              </li>
              <li>
              
              <NavLink to="/pinnotes" className={({ isActive })=>isActive ? "!bg-[#004f8ba0]" : "!bg-[#02253f62] dark:!bg-[#02253f2e]"}>
                <MdPushPin /> Pinned Notes
              </NavLink>
              </li>
              <li>
              
              <NavLink to="/trashnotes" className={({ isActive })=>isActive ? "!bg-[#004f8ba0]" : "!bg-[#02253f62] dark:!bg-[#02253f2e]"}>
                <FaTrash /> Trash Notes
              </NavLink>
              </li>
            </ul>
        </div>
    </section>
  )
}

export default Sidebar