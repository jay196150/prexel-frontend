
import './App.css'
import { BrowserRouter, Route, Routes,  } from 'react-router-dom'
import Home from './page/Home'
import Users from './page/Users'
import UpdateTask from './page/UpdateTask'
import AllTask from './page/AllTask'


function App() {
  
  return (
   <>
      <BrowserRouter>
         
        <Routes>
        <Route path='/' element = { <Home/>} />
        <Route path='/user' element = { <Users/>} />
        <Route path='/task' element = { <AllTask/>} />
        <Route path='/updatetask' element = { <UpdateTask/>} />
        </Routes>

      </BrowserRouter>
   </>
  )
}

export default App
