const express = require('express')
var router = express.Router();

const { tebakgambar } = require('../scraper/index') 

router.get('/tebakgambar', async(req, res) => {
	var hasil = await tebakgambar()
		res.json(hasil)
}).catch(e => {
            res.json({ message: 'Ups, error' })
})

module.exports = router
