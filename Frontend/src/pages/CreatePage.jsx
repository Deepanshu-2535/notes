import axios from 'axios';
import { ArrowLeftIcon } from 'lucide-react';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import {Link, useNavigate} from "react-router"
const CreatePage = () => {
  const [title,setTitile] = useState("");
  const [content,setContent] = useState("");
  const [loading,setLoading] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (e)=>{
    e.preventDefault();
    if(!title.trim() || !content.trim()){
      toast.error("All fields are required");
      return
    }
    setLoading(true);
    try{
      await axios.post("http://localhost:5001/notes",{title,content});
      toast.success("Note created successfully");
      navigate("/");
    }catch(error){
      toast.error("Failed to create note");
      console.error(error);
    }
    finally{
      setLoading(false);
    }
  }
  return (
    <div className='min-h-screen bg-base-100'>
      <div className='container mx-auto px-4 py-8'>
        <div className='max-w-2xl mx-auto'>
          <Link to='/'className='btn btn-ghost mb-6'>
            <ArrowLeftIcon className='size-5'/>
            Back to notes
          </Link>
          <div className='card bg-base-200 '>
            <div className='card-body'>
              <h2 className='card-title text-2xl mb-4'>Create a note</h2>
              <form onSubmit={handleSubmit}>
                <div className='form-control mb-4 w-auto'>
                  <label className='label'>
                    <span className='label-text'>Title</span>
                  </label>
                  <br />
                  <input type="text" placeholder='Note Title' className='input input-bordered w-full' onChange={(e)=>setTitile(e.target.value)}/>
                </div>
                <div className='form-control mb-4'>
                  <label className='label'>
                    <span className='label-text'>Content</span>
                  </label>
                  <br />
                  <textarea placeholder='Write your note here...' className='textarea textarea-bordered h-32 w-full' onChange={(e)=>{setContent(e.target.value)}}/>
                  </div>
                  <div className='card-actions justify-end'>
                    <button type='submit' className='btn btn-primary' disabled={loading}>
                      {loading?"Creating...":"Create"}

                    </button>
                  </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreatePage