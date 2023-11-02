import React, { useEffect, useState } from 'react'
import BackButton from '../components/BackButton'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import Spinner from '../components/Spinner'
import { shortenDate } from '../helper/utils'

const ShowBook = () => {
  const [book, setBook] = useState({})
  const [loading, setLoading] = useState(false)
  const { id } = useParams()

  useEffect(()=>{
    // fetch a book with the id
    const fetch = async () => {
      try {
        const response = await axios.get(`http://localhost:5555/books/${id}`)
        const obtainedBook = await response.data[0];
        setBook(_ => obtainedBook);
      } catch (error) {
        console.log(error.message);
        alert(error.message)
      } 
    }

    setLoading(true);

    fetch()

    setLoading(false);

  },[])

  return (
    <main className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Show Book</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className='flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4'>
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
            <span className='text-xl mr-4 text-gray-500'>Publish Year</span>
            <span>{book.publishYear}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Create Time</span>
            <span>{shortenDate(book.createdAt)}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Last Update Time</span>
            <span>{shortenDate(book.updatedAt)}</span>
          </div>
        </div>
      )
      }
    </main>
  )
}

export default ShowBook