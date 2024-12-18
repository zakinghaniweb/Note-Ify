import './Navbar.css'
import { useSelector } from 'react-redux'
import { BsDoorOpenFill } from 'react-icons/bs'
import { Link } from 'react-router-dom'

const Navbar = () => {
    const userDetails = useSelector((state)=>state.User.value)
    const handleLogOut = ()=>{
        localStorage.removeItem("currentUser")
    }
return (
    <section id='navbar'>
        <div className="navbar-row">
            <div className="navbar-logo">
                <h1>Note<span className='!text-[#0288F0]'>-ify</span></h1>
                <h2>A friendly note site made for you!</h2>
            </div>
            <div className="navbar-right">
                <div className="profile">
                    <div className="pfp">
                        <img src="https://pnghq.com/wp-content/uploads/pnghq.com-default-pfp-png-with-vibr-4.png" alt="" />
                    </div>
                    <h2>{userDetails?.displayName}</h2>
                    <Link to={"/login"} onClick={handleLogOut} className='p-[10px] rounded-lg bg-white flex items-center font-bold hover:bg-black hover:text-white duration-200'><BsDoorOpenFill className='rounded-lg' /> Log Out</Link>
                </div>
            </div>
        </div>
    </section>
)
}

export default Navbar