import React, { useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineDelete } from "react-icons/md";
import { PiBookOpenTextLight } from "react-icons/pi";
import { BiShow, BiUserCircle } from "react-icons/bi";

import { Link } from "react-router-dom";
import BookModal from "./BookModal";

const BookCar = ({ books }) => {
    const[showModal,setShowModal] = useState(false)
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {books.map((book, index) => (
        <div
          key={book._id}
          className="border-2 border-sky-400 rounded-xl p-4 m-4 relative hover:shadow-xl"
        >
          <h2 className="absolute top-1 right-2 px-4 py-1 bg-red-300 rounded-lg">
            {book.publishYear}
          </h2>
          <h4 className="my-4 text-gray-500">{book._id}</h4>
          <div className="flex justify-start items-center gap-x-2">
            <PiBookOpenTextLight className="text-red-300 text-2xl" />
            <h2 className="my-1">{book.title}</h2>
          </div>
          <div className="flex justify-start items-center gap-x-2">
            <BiUserCircle className="text-red-300 text-2xl" />
            <h2 className="my-1">{book.author}</h2>
          </div>
          <div className="flex justify-between items-center gap-x-2 mt-4 p-4">
            <BiShow className="text-3xl text-blue-800 hover:text-black cursor-pointer" onClick={()=>setShowModal(true)}/>
            <Link to={`/books/${book._id}`}>
              <BsInfoCircle className="text-green-800 text-2xl hover:text-black" />
            </Link>
            <Link to={`/books/${book._id}`}>
              <AiOutlineEdit className="text-yellow-800 text-2xl hover:text-black" />
            </Link>
            <Link to={`/books/${book._id}`}>
              <MdOutlineDelete className="text-red-800 text-2xl hover:text-black" />
            </Link>
          </div>
          {
            showModal && <BookModal book={book} onClose={()=> setShowModal(false)}/>
          }
        </div>
      ))}
    </div>
  );
};

export default BookCar;
