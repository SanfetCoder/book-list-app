import axios from 'axios'
import React from 'react'
import { useState, useEffect } from 'react'
import { BsLayerBackward } from 'react-icons/bs'
import { useNavigate, useParams } from 'react-router-dom'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'
import { useSnackbar } from "notistack"

const EditBook = () => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [publishYear, setPublishYear] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();
  const {id} = useParams();
  const {enqueueSnackbar} = useSnackbar();
  useEffect(()=>{
    // fetch the title, author and publishYear from the id
    const fetchBookAndUpdate = async () => {
      const response = await axios.get('http://localhost:5555/books/' + id);
      const obtainedBook = response.data[0];
      setTitle(obtainedBook.title);
      setAuthor(obtainedBook.author);
      setPublishYear(obtainedBook.publishYear);
    }

    setLoading(true)

    try {
      fetchBookAndUpdate()
    } catch (error) {
      console.log(error.message)
      alert(error.message)
    }

    setLoading(false)
  
  }, [])

  const handleEditBook = async () => {
    const data = {
      title,
      author,
      publishYear
    };

    setLoading(true)

    try {
      await axios.put('http://localhost:5555/books/' + id, data)
    } catch(error) {
      console.log(error.message)
      alert(error.message)
    }

    setLoading(false)
    enqueueSnackbar('Successfully updated the book', {variant : 'success'})
    navigate('/')
  }

  return (
    <main className='p-4'>
      <BackButton />
      <h1 className="text-3xl my-4">Edit Book</h1>
      {loading ? <Spinner /> : ''}
      <div className='flex flex-col border-2 border-sky-400 roundede-xl w-[600px] p-4 mx-auto'>
        <div className="my-4">
          <label className='text-xl mr-4 text-gray-500'>Title</label>
          <input 
            type='text'
            value={title}
            onChange={(e)=>setTitle(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className="my-4">
          <label className='text-xl mr-4 text-gray-500'>Author</label>
          <input 
            type='text'
            value={author}
            onChange={(e)=>setAuthor(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className="my-4">
          <label className='text-xl mr-4 text-gray-500'>Publish Year</label>
          <input 
            type='number'
            value={publishYear}
            onChange={(e)=>setPublishYear(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <button className='p-2 bg-sky-300 m-8' onClick={handleEditBook}>Save</button>
      </div>
    </main>
  )
}

export default EditBook