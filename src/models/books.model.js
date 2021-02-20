let conn = require('../../config/db.config');

module.exports = {
    getAllBuku : (result)=>{
        let sql = "SELECT buku.idbuku,nama_buku, kategori,penerbit,gambar from buku INNER join kategoribuku on buku.idkategori = kategoribuku.id_kategori "
        conn.query(sql,(err,res)=>{
            if(err){
                console.log("Error While fetching buku", err)
                result(null,err) 
            }else{
                console.log("Buku fetched successfully")
                result(null,res)
            }
        })
    },
    getBukuByID : (id,result)=>{
        let sql = "SELECT buku.idbuku,nama_buku, kategori,penerbit,gambar from buku INNER join kategoribuku on buku.idkategori = kategoribuku.id_kategori  WHERE buku.idbuku = ?"
        conn.query(sql,id,(err,res)=>{
            if(err){
                console.log("Erro While fetching buku by id")
                result(null,err)
            }else{
                result(null,res)
            }
        })
    },
    createBookNew:(newBook,result)=>{
            let sql = "INSERT INTO buku SET ?";
            conn.query(sql, newBook, (err, res) => {
                if (err) {
                    result({
                        message:'Failed',
                        status:false,
                    })
                } else {
                    result({
                        message: 'success',
                        status:true,
                        data: newBook
                    })
                }
            })
    },
    updateBook:(id,newData,result)=>{
        let sql = `UPDATE buku SET ? WHERE buku.idbuku = ?`
        conn.query(sql,[newData,id],(err,res)=>{
            if(err){
                result(null,err)
            }else{
                result({
                    message:'Update data succesfully',
                    status: true
                })
            }
        })
    },
    deleteBook:(id, result)=>{
        let sql =`DELETE FROM buku WHERE buku.id = ?`
        conn.query(sql,id,(err,res)=>{
            if(err){
                result({
                    message: 'failed',
                    status: false,
                    Error: ' Error while delete book',err
                })
            }else{
                if(res.affectedRows === 0){
                    result({
                        message:'Data not found'
                    })
                }else{
                result({
                    message:'Delete data succesfully',
                    status: true
                })
            }
            }
        })

    }
    
}


