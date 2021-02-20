const express = require('express');
const router = express.Router();

const kategoriController = require('../controllers/kategori.controller');

router.get('/',kategoriController.getKategoriesAll);

//get kategori by id
router.get('/:id',kategoriController.getIdKategori);

module.exports= router;