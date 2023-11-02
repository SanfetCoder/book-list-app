import axios from "axios";
import React, { useEffect, useState } from 'react';
import { MdOutlineAddBox } from "react-icons/md";
import { Link } from "react-router-dom";
import Spinner from '../components/Spinner';
import BooksCard from "../components/home/BooksCard";
import BooksTable from "../components/home/BooksTable";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [showType, setShowType] = useState('table');

  useEffect(()=>{
    // fetch all books
    const fetch = async () =>{

      try {
        const response = await axios.get('http://localhost:5555/books');
        setBooks(await response.data.data);
      } catch(error) {
        console.log(error.message);
        alert(error.message);
      }

    }

    setLoading(true)

    fetch()

    setLoading(false)

  },[])

  return (
    <main className="p-4">
      <div className="flex justify-center items-center gap-x-4">
        <button
          className="cursor-pointer bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg"
          onClick={()=>{setShowType('table')}}
        >
          Table
        </button>
        <button
          className="cursor-pointer bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg"
          onClick={()=>{setShowType('card')}}
        >
          Card
        </button>
      </div>
      <nav className="flex justify-between items-center">
        <h1 className="text-3xl my-8">Books List</h1>
        <Link to='/books/create'>
          <MdOutlineAddBox className="text-sky-800 text-4xl" />
        </Link>
      </nav>

      {isLoading ? (
        <Spinner />
      ) : (
        showType === 'table' ? (
          <BooksTable books={books}/>
        ) : (
          <BooksCard books={books}/>
        )
      )}
    </main>
  )
}

export default Home