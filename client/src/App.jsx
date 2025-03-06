import React from 'react'
import { Button } from './components/ui/button'

const App = () => {
  return (
    <div className='h-scren w-screen bg-gray-100 flex justify-center items-center'>
      <h1 className='text-4xl text-blue-500'>Hello World</h1>
      <Button>Click Me</Button>
    </div>
  )
}

export default App
