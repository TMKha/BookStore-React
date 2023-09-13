import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Spinner from "../components/spinner";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";
import BookTable from "../components/home/BookTable";
import BookCar from "../components/home/BookCar";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType,setShowType] = useState('table') // ['table','card'
  useEffect(() => {
    setLoading(true);
    getBooks();
  }, []);
  const getBooks = async () => {
    try {
      const res = await axios.get("http://localhost:3000/books");
      console.log(res.data.data);
      setBooks(res.data.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  console.log(books?.map((book) => book.title));
  return (
    <div className="p-4">
      <div className="flex justify-center items-center gap-x-4">
          <button onClick={()=> setShowType("table")} className="bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg">
            Table
          </button>
          <button onClick={()=> setShowType("card")} className="bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg">
            Card
          </button>
      </div>
      <div className="flex justify-between items-center">
        <h1 className="text-3xl my-8">Books List</h1>
        <Link to="/books/create">
          <MdOutlineAddBox className="text-sky-800 text-4xl" />
        </Link>
      </div>
      {loading ? <Spinner /> : showType=="table" ? (<BookTable books={books} />) : (<BookCar books={books} />)}
    </div>
  );
};

export default Home;
