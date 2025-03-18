import React from 'react'
import NavBar from './NavBar'

const MainPage = () => {
  return (
    <div className='bg-black min-h-screen'>
      <NavBar />
      <div className='bg-black p-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4'>
        {images.map((src, index) => (
          <div key={index} className='overflow-hidden rounded-lg shadow-lg'>
            
          </div>
        ))}
      </div>
    </div>
  )
}

export default MainPage