import React from 'react'
import PomodoroClock from './Components/Pomodoro'

const App = () => {
  return (
    <div className='flex flex-col w-[100dvw] h-[100dvh] items-center justify-center bg-[#251f47] text-white'>
      <PomodoroClock />
    </div>
  )
}

export default App