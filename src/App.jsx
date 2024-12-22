import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import './App.css'
import LayoutOne from './Layouts/LayoutOne'
import Register from './Components/Register/Register'
import app from './firebase.config'
import Login from './Components/Login/Login'
import Home from './Pages/Home/Home'
import { ToastContainer } from 'react-toastify'
import { Provider } from 'react-redux'
import store from './store'
import { StrictMode } from 'react'
import PinNotes from './Pages/PinNotes/PinNotes'
import AllNotes from './Pages/AllNotes/AllNotes'
import Trash from './Pages/Trash/Trash'


function App() {
  const myRoute = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route>
            <Route path='/register' element={<Register/>} />
              <Route path='/login' element={<Login/>} />
        </Route>
        <Route element={<LayoutOne/>}>
            <Route path='/home' element={<Home/>} />
            <Route path='/allnotes' element={<AllNotes/>} />
            <Route path='/pinnotes' element={<PinNotes/>} />
            <Route path='/trashnotes' element={<Trash/>} />
        </Route>
      </Route>
    )
  )
  return (
    <StrictMode>
    <Provider store={store}>
      <RouterProvider router={myRoute}/>
      <ToastContainer/>
    </Provider>
    </StrictMode>
  )
}

export default App
