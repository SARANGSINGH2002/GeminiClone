import React from 'react'
import Sidebar from './components/Sidebar/sidebar'
import Main from './components/Main/Main'


const App = () => {
  return (
    <>
      <Sidebar/>    {/* This is mounting of sidebar component on app.jsx */}
      
      <Main/>    
      
    </>
  )
}

export default App