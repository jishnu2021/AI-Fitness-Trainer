import React from 'react'
import Navbar from './component/Navbar'
import Home from './component/Home'
import Task from './component/Task'
import Introduction from './component/Introduction'
import { BrowserRouter, Route , Routes} from 'react-router-dom'
import Form from './component/Form';
import ProfileCard from './component/ProfileCard'



const App = () => {
  return (
    <BrowserRouter>
    <div>
      <Navbar/>
      
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='task' element={<Task/>}/>
        <Route path='intro' element={<Introduction/>}/>
        <Route path='contact' element={<Form/>}/>
        <Route path='profile' element={<ProfileCard/>}/>
        
      </Routes>
      
    </div>
    </BrowserRouter> 
  )
}

export default App
