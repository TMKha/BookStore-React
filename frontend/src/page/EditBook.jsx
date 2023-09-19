import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import BackButton from '../components/BackButton'
import { useSnackbar } from 'notistack'
import Loading from '../components/Loading'

const EditBook = () => {
  const [title,setTitle] = useState('')
  const [author,setAuthor] = useState('')
  const [publishYear,setPublishYear] = useState('')
  const [loading,setLoading]= useState(false)
  const navigate =useNavigate()
  const {id} = useParams()
  const {enqueueSnackbar} = useSnackbar()

  useEffect(() => {
    const getBookById = async (id) => {
      try {
        const res = await axios.get(`https://bookstore-api-pi.vercel.app/books/details/${id}`)
        console.log(res.data.data);
        setTitle(res.data.data.title)
        setAuthor(res.data.data.author)
        setPublishYear(res.data.data.publishYear)

        setLoading(false)
      } catch (error) {
        console.log(error);
        setLoading(false)
      }
    }
    setLoading(true)
    getBookById(id)
  },[])


  const handleSaveBook = async () => {
     const data = {
      title,
      author,
      publishYear
     }
     setLoading(true)
     try {
      const res = await axios.post(`https://bookstore-api-pi.vercel.app/books/edit/${id}`,data)
      console.log(res);
        setLoading(false)
          enqueueSnackbar('Book Updated Successfully',{variant:'success'})
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
       <h1>Edit Book</h1>
       {
        loading ? <Loading/> : (
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

export default EditBook