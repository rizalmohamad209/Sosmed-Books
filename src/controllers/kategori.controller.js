const kategoriModel = require('../models/kategori.model');

module.exports = {
    getKategoriesAll:(req,res)=>{
        kategoriModel.getAllKategories((err,kategori)=>{
            if(err){
                res.send(err)
            }else{
                res.send(kategori)
            }
        })
    },
    getIdKategori:(req,res)=>{
        kategoriModel.getKategoriById(req.params.id,(err,kategori)=>{
            if(err){
                res.send(err)
            }else{
                res.send(kategori)
            }
        })
    }
}