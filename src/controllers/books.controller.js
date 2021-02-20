const bukuModel = require('../models/books.model')
//get all books
module.exports = {
    getBooksAll : (req,res)=>{
        bukuModel.getAllBuku((err,buku)=>{
            console.log("We Are Here")
            if(err){
                res.send(err)
            }else{
                res.send({
                    message:'Success',
                    status: true,
                    data: buku
                })
            }
        })
    },
    getBooksById: (req,res)=>{
        bukuModel.getBukuByID(req.params.id, (err,buku)=>{
            console.log("Books by id")
            if(err){
                res.send(err)
            }else{
                 // console.log("by id", buku)
                res.send(buku)
            }
        })
    },
    createNewBook:(req,res)=>{
        const newBook = req.body
        console.log("Buku",newBook);
        bukuModel.createBookNew(newBook,(err,data)=>{
            if(err){
                res.send(err)
            }else{
                res.send(data)
            }  
        })
    },
    bookUpdate:(req,res)=>{
        const newData = req.body
        bukuModel.updateBook(req.params.id, newData,(err,buku) =>{
            if(err){
                res.send(err)
            }else{
                res.send(buku)
            }
        })
    },
    bookDelete:(req,res)=>{
        bukuModel.deleteBook(req.params.id,(err,buku)=>{
            if(err){
                res.send(err)
            }else{
                res.send(buku)
            }
        })
    }
}