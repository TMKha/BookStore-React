import express from 'express';
import { Book } from '../models/bookModel.js';

const router = express.Router();
// Route for Save a new Book
router.post("/",async(request,respone)=>{
    try {
        if(
            !request.body.title ||
            !request.body.author ||
            !request.body.publishYear
        ) {
            return respone.status(400).send(
                {message:"Send all required fields: title, author, publishYear"}
            );
        }
        const newBook = {
            title:request.body.title,
            author:request.body.author,
            publishYear:request.body.publishYear

        }
        const book = await Book.create(newBook);
        return respone.status(201).send(book);
    } catch (error) {
        console.log(error.message);
        respone.status(500).send(error.message);
    }
});

// Route for Getall books from database
router.get('/',async (request,respone)=>{
    try {
        const books = await Book.find({});
        return respone.status(200).json({
            count:books.length,
            data:books
        });
    } catch (error) {
        console.log(error.message);
        respone.status(500).send({message:error.message})
     }
    }
    )

// Route for Get One Book from database by id
router.get('/:id',async (request,respone)=>{
    try {
        const {id} = request.params; 

        const book = await Book.findById(id);
        return respone.status(200).json({
            data:book
        });
    } catch (error) {
        console.log(error.message);
        respone.status(500).send({message:error.message})
     }
    }
    )
// Route for Update a book by id
router.post('/:id',async (request,respone)=>{
    try {
        if(!request.body.title||
            !request.body.author||
            !request.body.publishYear)
            {
                return respone.status(400).send({message:"Send all required fields: title, author, publishYear"});
            }
        const {id} = request.params;
        const result = await Book.findByIdAndUpdate(id,request.body);
        if(!result) {
            return respone.status(404).json({messagwe:"Book not found"});
        }
        return respone.status(200).send({message:'Book updated successfully'});
        
    } catch (error) {
        console.log(error.message);
        return respone.status(500).send({message:error.message})
    }
})

// Route for Delete a book by id
router.delete('/:id',async (request,respone)=>{
    try {
        const {id} =request.params;
        
        const result = await Book.findByIdAndDelete(id);
        if(!result) {
            return respone.status(404).json({messagwe:"Book not found"});
        }

        return respone.status(200).send({message:'Book deleted successfully'});
        
    } catch (error) {
        console.log(error.message);
        return respone.status(500).send({message:error.message})
    }
})

export default router;