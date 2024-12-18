import { useState } from 'react';
import './Login.css'
import { FaEye, FaLock } from "react-icons/fa";
import { FaEyeLowVision } from 'react-icons/fa6';
import 'react-toastify/dist/ReactToastify.css';
import { IoIosMail } from "react-icons/io";
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useDispatch } from 'react-redux';
import { userData } from '../../Slices/userSlice';
import { Slide, toast } from 'react-toastify';

const Login = () => {
    const [showEye,setShowEye] = useState(false)
    const [logindata,setLoginData] = useState({Email: '', Password: ''})
    const [loginError,setLoginError] = useState("")
    const navigate = useNavigate()
    const dispatch = useDispatch();
    // const [toastifyInfo,setToastifyInfo] = useState({weakPass: 'Please enter a strong password', invalidEmail: 'Please enter a valid email'})
    // Firebase Variables =>
        
        let handleLogIn = (e)=>{
            e.preventDefault()
            const auth = getAuth();

            // Sign In
            signInWithEmailAndPassword(auth, logindata.Email, logindata.Password)
            // What heppends after Sign In =>
            .then((userCredential) => {
            const user = userCredential.user;

            console.log(user)
            if (user.emailVerified == true) {
                toast.success('Login Successful', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    transition: Slide,
                });
                localStorage.setItem("currentUser",JSON.stringify(user))
                navigate("/home")
                dispatch(userData(user))
            }
            else{
                toast.error('Email is not verified', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    transition: Slide,
                });
            }
            setLoginError("")
        })
        // Errors =>
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            setLoginError("Something went wrong")
        });
    }
    
return (
    <div className='w-full h-screen flex items-center justify-center'>
        <div className="login-form">
            <div className="form-row">
                <h1 className="form-heading">
                    Login
                </h1>
                <form>
                <div className="group">
                    <IoIosMail className='password-icon'/>
                    <input className="login-input" onChange={(e)=>{setLoginData((prev)=>({...prev,Email:e.target.value}))}} type="email" placeholder="Email"/>
                </div>
                <div className="group">
                    <FaLock className='password-icon'/>
                    <input className="login-input" onChange={(e)=>{setLoginData((prev)=>({...prev,Password:e.target.value}))}} type={showEye ? "text" : "password"} placeholder="Password"/>
                    {
                        showEye ?
                        <FaEyeLowVision onClick={()=>setShowEye(!showEye)} className='password-icon-r'/>
                        :
                        <FaEye onClick={()=>setShowEye(!showEye)} className='password-icon-r'/>
                    }
                </div>
                <p className="name-error text-red-600 font-semibold mt-2">{loginError}</p>
                <button type='submit' onClick={handleLogIn} className="submit">Submit</button>
                </form>
                <h3 className='left-[50%] translate-x-[-50%] text-white text-sm font-BrandFont text-center absolute bottom-[50px]'>Create a new account <Link className='text-[#e60073]' to={"/register"}>Register</Link></h3>
            </div>
        </div>
    </div>
  )
}

export default Login