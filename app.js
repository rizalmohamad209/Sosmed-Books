const express = require('express')
const bodyParser = require('body-parser')
const app = express();
const path = require('path')
const port = process.env.PORT || 3005;
//import books route
const booksRoute= require('./src/routes/books.route');
//import kategori route
const kategoriRoute = require('./src/routes/kategori.route');
//import koneksi database
const conn = require('./config/db.config')

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.get('/api',(req,res)=>{
    res.send({
        message:'Selamat Datang di api Buku',
        create: 'Created By Mohamad Rizal Khamami',
    })
});
//create books routes
app.use('/api/books',booksRoute);
//create kategori routes
app.use('/api/kategori',kategoriRoute )

app.set('views', path.join(__dirname,'./src/views'));
app.set('view engine', 'hbs')


//end point books
app.get('/',(req,res)=>{
    let sql = ["SELECT buku.idbuku,nama_buku, kategori,penerbit,gambar,kategoribuku.id_kategori from buku inner join kategoribuku on buku.idkategori = kategoribuku.id_kategori",
    "SELECT * FROM kategoribuku"];
    conn.query(sql.join(';'), (err, resolve)=>{
        if(err){
            console.log("Error Satttt"+ err)
        }else{
            res.render('bookIndex',{
                title: 'Crud',
                users: resolve[0],
                kategori: resolve[1]

            })
        }
    }) 
})

//create new book
app.post('/addBook',(req,res)=>{
    let newData = req.body;
    // console.log(newData)
    let sql = "INSERT INTO buku set ?"
    conn.query(sql, newData,(err,result)=>{
        if(err){
            console.log("Error Satttt"+ err)
        }else{
           res.redirect('/');
           
        }
    })
})

//edit book
app.post('/updateBook',(req,res)=>{
    let Data = {nama_buku: req.body.nama_buku, idkategori: req.body.idkategori, penerbit: req.body.penerbit, gambar: req.body.gambar};
    let id = req.body.id
    let sql = "UPDATE buku SET ?  WHERE idbuku= ?";
    conn.query(sql,[Data,id],(err,result)=>{
        if(err){
            console.log("Error while update data");
        }else{
            res.redirect('/')
        }
    })
})

//delete book
app.post('/deleteBook',(req,res)=>{
    let dataHps = req.body.id
    let sql = "DELETE FROM buku WHERE idbuku = ?"
    conn.query(sql, dataHps, (err,result)=>{
        if(err){
            console.log("Error while deleting data")
        }else{
            res.redirect('/')
        }
    } )
})

//end point kategori
app.get('/kategori',(req,res)=>{
    let sql = "SELECT * FROM kategoribuku";
    conn.query(sql,(err,result)=>{
        if(err){
            console.log(err)
        }else{
            res.render('kategoriIndex',{
                title: "kategori",
                result: result
            })
        }
    })
})

//add kategori
app.post('/addKategori',(req,res)=>{
    let newData = req.body;

    // console.log(newData)
    let sql = "INSERT INTO kategoribuku SET ?"
    conn.query(sql, newData,(err,result)=>{
        if(err){
            console.log("Error Satttt"+ err)
        }else{
           res.redirect('/kategori');
           
        }
    })
})

//update kategori
app.post('/updateKategori',(req,res)=>{
    let Data = {kategori :req.body.kategori};
    let id = req.body.id
    let sql = "UPDATE kategoribuku SET ?  WHERE id_kategori= ?";
    conn.query(sql,[Data,id],(err,result)=>{
        if(err){
            console.log("Error while update data");
        }else{
            res.redirect('/kategori')
        }
    })
})
//delete kategori
app.post('/deleteKategori',(req,res)=>{
    let dataHps = req.body.id
    let sql = "DELETE FROM kategoribuku WHERE id_kategori = ?"
    conn.query(sql, dataHps, (err,result)=>{
        if(err){
            console.log("Error while deleting data")
        }else{
            res.redirect('/kategori')
        }
    } )
})

app.listen(port, ()=>{
    console.log(`Server running at port ${port}`)
})