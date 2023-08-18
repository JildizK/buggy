import React from 'react'
import MainRoutes from './routing/MainRouting'
import Navbar from './components/Navbar'
import Footer from './components/Footer'


const App = () => {
  return (
    
    <>
    <Navbar/>
    <div className='main'>
      <MainRoutes/>
    </div>
    <Footer/>
    </>
  )
}

export default App