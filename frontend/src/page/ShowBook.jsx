import axios from 'axios';
import React, { useEffect, useState } from 'react'
import BackButton from '../components/BackButton';
import { useParams } from 'react-router-dom';
import Loading from '../components/Loading';

const ShowBook = () => {

    const [book,setBook] = useState({});
    const [loading,setLoading] = useState(false);
    const {id} = useParams();

    const getBookById = async (id) => { 
        try {
            const res = await axios.get(`https://bookstore-api-pi.vercel.app/${id}`)
            console.log(res.data.data);
            setBook(res.data.data)
            setLoading(false)
        } catch (error) {
            console.log(error);
            setLoading(false)
        }
    }

    useEffect(() => {
        setLoading(true);
        getBookById(id)
    },[] );
    return (
        <div className="p-4">
            <BackButton/>
            <h1 className='text-3xl my-4'>Show Book</h1>
            {
                loading ? (
                    <Loading/>
                ) : (
                    <div className="flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4">
                            <div className='my-4'>
                                <span className='text-xl mr-4 text-gray-500'>Id</span>
                                <span>{book._id}</span>
                            </div>
                            <div className='my-4'>
                                <span className='text-xl mr-4 text-gray-500'>Title</span>
                                <span>{book.title}</span>
                            </div>
                            <div className='my-4'>
                                <span className='text-xl mr-4 text-gray-500'>Author</span>
                                <span>{book.author}</span>
                            </div>
                              <div className='my-4'>
                                <span className='text-xl mr-4 text-gray-500'>Pulish Year</span>
                                <span>{book.publishYear}</span>
                            </div>
                            <div className='my-4'>
                                <span className='text-xl mr-4 text-gray-500'>Create Time</span>
                                <span>{new Date(book.createdAt).toString()}</span>
                            </div>
                            <div className='my-4'>
                                <span className='text-xl mr-4 text-gray-500'>Update Time</span>
                                <span>{new Date(book.updatedAt).toString()}</span>
                            </div>
                            
                            
                    </div>
                )
            }
        </div>
    )

}

export default ShowBook