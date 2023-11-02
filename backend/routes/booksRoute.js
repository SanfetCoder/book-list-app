import express from "express";
import { Book } from "../models/bookModel.js";

const router = express.Router();

// Route for Save a new Book
router.post('/', async (req,res)=>{
  
  try {
    // accept variables from request body
    const {title, author, publishYear} = req.body
    // guard condition
    if (!title || !author || !publishYear) return res.status(400).send({
      message : 'Send all required fields : title, author, publishYear'
    })
    // create new Book document
    const newBook = {
      title,
      author,
      publishYear
    };

    // push the new book to the database
    const book = await Book.create(newBook)

    // return the book back to the client
    return res.status(201).send(book)

  } catch (error) {
    // log the error
    console.log(error.message);
    res.status(500).send({mesasge : error.message})
  }
});

// Route for Get All Books from database
router.get('/', async (req,res)=>{
  try {
    // get all books from the database using mongoose
    const books = await Book.find({})
    // return all books to the client
    res.status(200).json({
      count : books.length,
      data : books
    })
  } catch (error) {
    console.log(error.message);
    res.status(500).send({message : error.message})
  }
});

// Route for Get One Book from database by id
router.get('/:id', async (req,res)=>{
  try {
    const {id} = req.params;
    // get all books from the database using mongoose
    const book = await Book.find({_id : id});
    // return all books to the client
    res.status(200).send(book)
  } catch (error) {
    console.log(error.message);
    res.status(500).send({message : error.message})
  }
});

// Route for Update a Book
router.put('/:id', async (req,res)=>{
  try {
    // retreieve all variables from request body
    const {title, author, publishYear} = req.body;
    // guard condition
    if (!title || !author || !publishYear) res.status(400).send({
      message : 'Send all required fields: title, author, publishYear'
    })

    const { id } = req.params;

    // update the book by id
    const result = await Book.findByIdAndUpdate(id, req.body);

    // guard condition
    if (!result) return res.status(404).json({message : 'Book not found'});

    return res.status(200).send({
       message : 'Book updated successfully',
       updatedData : result
      });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({message : error.message});
  }
});

// Route for Deleting a book
router.delete('/:id', async (req,res)=>{
  try {
    const {id} = req.params;

    const result = await Book.findByIdAndDelete({_id : id});

    // guard condition
    if (!result) return res.send(404).json({message : 'Book not found'});

    // send the result back to the client
    return res.status(200).send({message : 'Book deleted successfully', deletedBook : result})
  } catch(error) {
    console.log(error.message);
    res.status(500).send({message : error.message})
  }
})

export default router;