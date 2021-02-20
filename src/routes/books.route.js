const express = require('express');
const router = express.Router();

const bookController = require('../controllers/books.controller');
//get al books
router.get('/',bookController.getBooksAll);
//get book by id
router.get('/:id',bookController.getBooksById);
//create new book
router.post('/',bookController.createNewBook);
//update book
router.put('/:id',bookController.bookUpdate);
//delete book
router.delete('/:id',bookController.bookDelete)

module.exports = router;

