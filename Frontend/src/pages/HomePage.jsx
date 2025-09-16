import React from 'react'
import toast from 'react-hot-toast'

const HomePage = () => {
  return (
    <div>This is the home page
        <button onClick={()=>{toast.success("SUCCESS")}}>Click me</button>
    </div>
  )
}

export default HomePage