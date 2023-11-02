import mongoose from "mongoose";

// Book Schema
const bookSchema = mongoose.Schema({
  title : {
    type : String,
    required : true
  },
  author : {
    type : String,
    required : true
  },
  publishYear : {
    type : Number,
    required : true
  }
}, {timestamps : true});

// Book Model
export const Book = mongoose.model('Book', bookSchema);