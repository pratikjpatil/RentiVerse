import React from 'react'
import Loading from "../assets/rentiVerseLoadingGif.gif"
import toast from 'react-hot-toast';

function loadingPage() {
  return (
    <div className='loadingGif'>
      <img src={Loading} alt="Loading..." />  
    </div>

  )
}

export default loadingPage