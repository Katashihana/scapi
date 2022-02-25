const express = require('express')
var router = express.Router();

const { artinama, ramalanJodoh } = require('../scraper/primbon')

router.get('/artinama', async(req, res) => {
	var nama = req.query.nama
	if (!nama) return res.json({ message: 'masukan parameter nama' })
	var hasil = await artinama(nama)
		res.json(hasil)
}).catch(e => {
            res.json({ message: 'Ups, error' })
})

router.get('/ramalanjodoh', async(req, res) => {
	var nama = req.query.nama
  var pasangan = req.query.pasangan
	if (!nama) return res.json({ message: 'masukan parameter nama' })
  if (!pasangan) return res.json({ message: 'masukan parameter pasangan' })
	var hasil = await ramalanJodoh(nama, pasangan)
		res.json(hasil)}).catch(e => {
            res.json({ message: 'Ups, error' })
})

module.exports = router
