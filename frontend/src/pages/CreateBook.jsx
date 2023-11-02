import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'
import { useSnackbar } from 'notistack';

const CreateBook = () => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [publishYear, setPublishYear] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleSaveBook = async () => {
    const data = {
      title,
      author,
      publishYear
    };

    setLoading(true)

    try {
      await axios.post('http://localhost:5555/books', data)
    } catch(error) {
      console.log(error.message)
      enqueueSnackbar(error.message, {variant : 'error'})
    }

    setLoading(false)
    enqueueSnackbar('You have just created a book named ' + title, {variant : 'success'})
    navigate('/')
  }

  return (
    <main className='p-4'>
      <BackButton />
      <h1 className="text-3xl my-4">Create Book</h1>
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
        <button className='p-2 bg-sky-300 m-8' onClick={handleSaveBook}>Save</button>
      </div>
    </main>
  )
}

export default CreateBook