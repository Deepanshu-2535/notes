import axios from 'axios';
import { LoaderIcon,ArrowLeftIcon,Trash2Icon } from 'lucide-react';
import { Link } from 'react-router';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router';

const NoteDetailPage = () => {
  const [note,setNote] = useState(null);
  const [loading,setLoading] = useState(true);
  const [saving,setSaving] = useState(false);
  const navigate = useNavigate();
  const {id} = useParams();
  useEffect(()=>{
    async function fetchDetails() {
      try{
        const res = await axios.get(`http://localhost:5001/notes/${id}`);
        setNote(res.data);
      }
      catch(error){
        toast.error("Error Fetching Note");
        console.error(error);
      }
      finally{
        setLoading(false)
      }
    }
    fetchDetails();
  },[id])
  const handleDelete = async ()=>{
    if(!window.confirm("Are you sure ?")){return;}
    try{
      await axios.delete(`http://localhost:5001/notes/${id}`);
      toast.success("Note Successfully deleted");
      navigate('/');
    }
    catch(error){
      toast.error("Error Deleting Note");
      console.error(error)
    }
  }
  const handleSave = async ()=>{
    if(!note.title.trim() || !note.content.trim()){
      toast.error("All fields are required")
      return;
    }
    setSaving(true);
    try{
      await axios.put(`http://localhost:5001/notes/${id}`,{title:note.title , content:note.content});
      toast.success("Note Successfully Updated");
      navigate('/');
    }
    catch(error){
      toast.error("Error Updating Note");
      console.error(error);
    }
    finally{
      setSaving(false);
    }
  }
  if(loading){
    return(
      <div className='min-h-screen bg-base-200 flex items-center justify-center'>
        <LoaderIcon className='animate-spin size-10'/>
      </div>
    )
  }
  return (
    <div className="min-h-screen bg-base-100">
      <div className="container mx-auto px-4 py-8">
        <div className="mx-w-2xl mx-auto">
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <Link to="/" className="btn btn-ghost">
                <ArrowLeftIcon className="h-5 w-5" />
                Back to Notes
              </Link>
              <button onClick={handleDelete} className="btn btn-error btn-outline">
                <Trash2Icon className="h-5 w-5" />
                Delete Note
              </button>
            </div>
            <div className="card bg-base-200">
              <div className='card-body'>
                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Title</span>
                  </label>
                  <br />
                  <input
                    type="text"
                    placeholder="Note title"
                    className="input input-bordered w-full"
                    value={note.title}
                    onChange={(e) => setNote({ ...note, title: e.target.value })}
                  />
                </div>

                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Content</span>
                  </label>
                  <br />
                  <textarea
                    placeholder="Write your note here..."
                    className="textarea textarea-bordered h-32 w-full"
                    value={note.content}
                    onChange={(e) => setNote({ ...note, content: e.target.value })}
                  />
                </div>

                <div className='card-actions justify-end'>
                  <button className='btn btn-primary' disabled={saving} onClick={handleSave}>
                    {saving?"Saving...":"Save"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NoteDetailPage