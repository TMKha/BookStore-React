import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import BackButton from '../components/BackButton'
import Spinner from '../components/spinner'
import { useSnackbar } from 'notistack'

const CreateBook = () => {
  const [title,setTitle] = useState('')
  const [author,setAuthor] = useState('')
  const [publishYear,setPublishYear] = useState('')
  const [loading,setLoading]= useState(false)
  const navigate =useNavigate()

  const {enqueueSnackbar} = useSnackbar()

  const handleSaveBook = async () => {
     const data = {
      title,
      author,
      publishYear
     }
     setLoading(true)
     try {
        const res = await axios.post('https://bookstore-api-pi.vercel.app/books',data)
        console.log(res);
        setLoading(false)
         enqueueSnackbar('Book Created Successfully',{variant:'success'})
        navigate('/')
     } catch (error) {
      setLoading(false)
      enqueueSnackbar(error.message,{variant:'error'})
      alert(error.message)
     }


  }

  return (
    <div className="p-4">
       <BackButton/>
       <h1>Create Book</h1>
       {
        loading ? <Spinner/> : (
          <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
              <div className="my-4">
                 <label className='text-xl mr-4 text-gray-500'>Title</label>
                 <input type="text" 
                  value = {title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="border-2 border-gray-500 px-4 py-2 w-full" 
                 />
              </div>
              <div className="my-4">
                 <label className='text-xl mr-4 text-gray-500'>Author</label>
                 <input type="text" 
                  value = {author}
                  onChange={(e) => setAuthor(e.target.value)}
                  className="border-2 border-gray-500 px-4 py-2 w-full" 
                 />
              </div>
              <div className="my-4">
                 <label className='text-xl mr-4 text-gray-500'>Publish Year</label>
                 <input type="number" 
                  value = {publishYear}
                  onChange={(e) => setPublishYear(e.target.value)}
                  className="border-2 border-gray-500 px-4 py-2 w-full" 
                 />
              </div>
              <button onClick={handleSaveBook} className="bg-sky-300 m-8">Save</button>
          </div>
        )
       }
    </div>
  )
}

export default CreateBook