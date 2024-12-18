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
            <Route path='/notes' element={<Home/>} />
            <Route path='/pinnotes' element={<Home/>} />
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
