import { useState } from 'react';
import './Register.css'
import { FaEye, FaLock } from "react-icons/fa";
import { FaEyeLowVision } from 'react-icons/fa6';
import { FaUser } from "react-icons/fa";
import { getAuth , updateProfile , createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { Slide, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { IoIosMail } from "react-icons/io";
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
    const [showEye,setShowEye] = useState(false)
    const [logindata,setLoginData] = useState({userName: '', Email: '', Password: ''})
    const [loginErrors,setLoginErrors] = useState({nameError: '', emailError: '', passwordError: ''})
    const [toastifyInfo,setToastifyInfo] = useState({weakPass: 'Please enter a strong password', invalidEmail: 'Please enter a valid email'})
    const navigate = useNavigate();

    let handleSubmit = (e)=>{
        e.preventDefault()
        if (logindata.userName == "") {
            setLoginErrors((prev)=>({...prev, nameError:"Your user name is invalid"}))
        }
        if (logindata.Email == "") {
            setLoginErrors((prev)=>({...prev, emailError:"Your email is invalid"}))
        }
        if (logindata.Password == "") {
            setLoginErrors((prev)=>({...prev, passwordError:"Your password is invalid"}))
        }
        else{
            const auth = getAuth();
            // Update profile info
            createUserWithEmailAndPassword(auth, logindata.Email, logindata.Password)
            .then((userCredential) => {
            const user = userCredential.user;
            updateProfile(auth.currentUser, {
                displayName: logindata.userName, photoURL: "https://pnghq.com/wp-content/uploads/pnghq.com-default-pfp-png-with-vibr-4.png"
            }).then(() => {
                // Sending verify email
                sendEmailVerification(auth.currentUser)
                .then(() => {                    
                    toast.info('Email verification code sent', {
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
                });
                navigate("/login")
            })
            console.log(user)
            })
            .catch((error) => {
                const errorCode = error.code;
                console.log(errorCode)
                // Weak password error
                if (errorCode == "auth/weak-password") {
                    toast.error(toastifyInfo.weakPass, {
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
                // Invalid email error
                if (errorCode == "auth/invalid-email") {
                    toast.error(toastifyInfo.invalidEmail, {
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
                // Other error
                else{
                    toast.error(errorCode, {
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
            });
        }
    }
    
return (
    <div className='w-full h-screen flex items-center justify-center'>
        <div className="register-form">
            <div className="form-row">
                <h1 className="form-heading">
                    Register
                </h1>
                <form>
                <div className="group">
                    <FaUser className='password-icon'/>
                    <input className="login-input" onChange={(e)=>{setLoginData((prev)=>({...prev,userName:e.target.value})), setLoginErrors((prev)=>({...prev, nameError:""}))}} type="text" placeholder="Name"/>
                </div>
                <p className="name-error text-red-600 font-semibold mt-2">{loginErrors.nameError}</p>
                <div className="group">
                    <IoIosMail className='password-icon'/>
                    <input className="login-input" onChange={(e)=>{setLoginData((prev)=>({...prev,Email:e.target.value})),setLoginErrors((prev)=>({...prev, emailError:""}))}} type="email" placeholder="Email"/>
                </div>
                <p className="name-error text-red-600 font-semibold mt-2">{loginErrors.emailError}</p>
                <div className="group">
                    <FaLock className='password-icon'/>
                    <input className="login-input" onChange={(e)=>{setLoginData((prev)=>({...prev,Password:e.target.value})),setLoginErrors((prev)=>({...prev, passwordError:""}))}} type={showEye ? "text" : "password"} placeholder="Password"/>
                    {
                        showEye ?
                        <FaEyeLowVision onClick={()=>setShowEye(!showEye)} className='password-icon-r'/>
                        :
                        <FaEye onClick={()=>setShowEye(!showEye)} className='password-icon-r'/>
                    }
                </div>
                <p className="name-error text-red-600 font-semibold mt-2">{loginErrors.passwordError}</p>
                <button type='submit' onClick={handleSubmit} className="submit">Submit</button>
                </form>
                <h3 className='left-[50%] translate-x-[-50%] text-white text-sm font-BrandFont text-center absolute bottom-[50px]'>Do not have an account? <Link className='text-[#e60073]' to={"/login"}>Login</Link></h3>
            </div>
        </div>
    </div>
  )
}

export default Register