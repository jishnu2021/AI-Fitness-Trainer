import React from 'react'
import Navbar from './component/Navbar'
import Home from './component/Home'
import Task from './component/Task'
import Introduction from './component/Introduction'
import { SignInContainer } from './component/logout'
import { BrowserRouter, Route , Routes} from 'react-router-dom'



const App = () => {
  return (
    <div>
      <Navbar/>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='task' element={<Task/>}/>
        <Route path='intro' element={<Introduction/>}/>
      </Routes>
      </BrowserRouter> 
    </div>
  )
}

export default App
