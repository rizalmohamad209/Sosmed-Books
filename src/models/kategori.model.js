const conn = require('../../config/db.config');

module.exports ={
    getAllKategories :(result)=>{
        let sql = "SELECT * FROM kategoribuku"
        conn.query(sql,(err,res)=>{
            if(err){
                result(null,err)
            }else{
                result(null,res)
            }
        })
    },
    getKategoriById :(id,result)=>{
        let sql =" SELECT kategori FROM kategoribuku WHERE id_kategori = ?"
        conn.query(sql,id,(err,res)=>{
            if(err){
                result(null,err)
            }else{
                result(null,res)
            }
        })
    }
}