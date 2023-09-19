import axios from 'axios';
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import BackButton from '../components/BackButton';
import { useSnackbar } from 'notistack';
import Loading from '../components/Loading';

const DeleteBook = () => {
  const [loading,setLoading] = useState(false);
  const navigate = useNavigate()
  const {id} = useParams()
  const {enqueueSnackbar} = useSnackbar()

  const handleDeleteBook = async () => {
    setLoading(true)
    try {
      const res = await axios.delete(`https://bookstore-api-pi.vercel.app/books/delete/${id}`)
      console.log(res);
      setLoading(false)
      enqueueSnackbar('Book Deleted Successfully',{variant:'success'})
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
        <h1 className='text-3xl my-4'>Delete Book</h1>
        {loading ? <Loading/> : (
          <div className="flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
           <h3 className='text-2xl'>Are You Sure You want to delete this book?</h3>
            <button className='bg-red-600 p-4 text-white m-8 w-full' onClick={handleDeleteBook}> Yes, Delete it</button>
            </div>
           )


        }
    </div>
  )
}

export default DeleteBook