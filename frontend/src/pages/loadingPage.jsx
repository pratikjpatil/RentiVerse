import React from 'react'
import Loading from "../assets/rentiVerseLoadingGif.gif"

function loadingPage() {
  return (
    <div className='loadingGif'>
      <img src={Loading} alt="Loading..." />  
    </div>

  )
}

export default loadingPage