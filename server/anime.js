const express = require('express')
var router = express.Router();
const axios = require('axios')
const fetch = require('node-fetch')
const fs = require('fs')
const { getBuffer } = require('../lib/function')
const { dl } = require('../scraper/aiovideodl')

var key = 'Katashi' // Apikey Lu Ngab
var creatorList = ['Katashi Hana']; // Nama Lu Ngab
var creator = creatorList[Math.floor(Math.random() * creatorList.length)]; // Ini jan diubah

const mynimeku = require('../scraper/mynime')
const scrapper = require('../scraper/scrapper')

__path = process.cwd()
var error = __path + '/views/error.html' // Error
var invalidKey = __path + '/views/invalidKey.html' // Apikey Invalid

async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

loghandler = {
	notparam: {
        status: false,
        creator: `${creator}`,
        code: 406,
        message: 'Masukan parameter apikey!'
    },
    notnama: {
        status: false,
        creator: `${creator}`,
        code: 406,
        message: 'Masukan parameter nama'
    },
    notimg: {
        status: false,
        creator: `${creator}`,
        code: 406,
        message: 'Masukan parameter img'
    },
    notemoji: {
        status: false,
        creator: `${creator}`,
        code: 406,
        message: 'Masukan parameter emoji'
    },
    notangka: {
        status: false,
        creator: `${creator}`,
        code: 406,
        message: 'Masukan parameter angka'
    },
    notnomor: {
        status: false,
        creator: `${creator}`,
        code: 406,
        message: 'Masukan parameter nomor'
    },
    notjumlah: {
        status: false,
        creator: `${creator}`,
        code: 406,
        message: 'Masukan parameter jumlah'
    },
    notkey: {
        status: false,
        creator: `${creator}`,
        code: 406,
        message: 'Masukan parameter key'
    },
    noturl: {
        status: false,
        creator: `${creator}`,
        code: 406,
        message: 'Masukan parameter url'
    },
    notquery: {
        status: false,
        creator: `${creator}`,
        code: 406,
        message: 'Masukan parameter query'
    },
    notkata: {
        status: false,
        creator: `${creator}`,
        code: 406,
        message: 'Masukan parameter kata'
    },
    notlang: {
        status: false,
        creator: `${creator}`,
        code: 406,
        message: 'Masukan parameter bahasa'
    },
    nottext: {
        status: false,
        creator: `${creator}`,
        code: 406,
        message: 'Masukan parameter text'
    },
    nottext2: {
        status: false,
        creator: `${creator}`,
        code: 406,
        message: 'Masukan parameter text2'
    },
    notnabi: {
        status: false,
        creator: `${creator}`,
        code: 406,
        message: 'Masukan parameter nabi'
    },
    nottext3: {
        status: false,
        creator: `${creator}`,
        code: 406,
        message: 'Masukan parameter text3'
    },
    nottheme: {
        status: false,
        creator: `${creator}`,
        code: 406,
        message: 'Masukan parameter theme'
    },
    notusername: {
        status: false,
        creator: `${creator}`,
        code: 406,
        message: 'Masukan parameter username'
    },
    notvalue: {
        status: false,
        creator: `${creator}`,
        code: 406,
        message: 'Masukan parameter value'
    },
    notheme: {
    	status: false,
        creator: `${creator}`,
        code: 406,
        message: 'Tema tidak tersedia silahkan masukkan texmaker/list atau baca dokumentasi'
     },
    invalidKey: {
        status: false,
        creator: `${creator}`,
        code: 406,
        message: `Apikey tidak ditemukan! Silahkan kontak Owner untuk dapatkan Apikey wa.me/62895337278647`
    },
    invalidLink: {
        status: false,
        creator: `${creator}`,
        message: 'Masukan link yang valid!'
    },
    invalidkata: {
        status: false,
        creator: `${creator}`,
        message: 'Kata tidak valid'
    },
    invalidtext: {
    	status: false,
        creator: `${creator}`,
        message: 'Teks tidak valid'
    },
    notAddApiKey: {
        status: false,
        creator: `${creator}`,
        code: 406,
        message: 'Masukan parameter status, apikeyInput, email, nomorhp, name, age, country, exp'
    },
    notbase64: {
        status: false,
        creator: `${creator}`,
        code: 406,
        message: 'Masukan parameter teks base64'
    },
    number: {
        status: false,
        creator: `${creator}`,
        code: 406,
        message: 'Teks harus berupa angka!'
    },
    error: {
        status: false,
        creator: `${creator}`,
        message: 'Erorr! Mungkin Sedang dalam perbaikan'
    }
}

router.get('/mynimekuSearch', async(req, res) => {
  var apikeyInput = req.query.apikey,
  var query = req.query.query
  if(!apikeyInput) return res.json(loghandler.notparam)
  if(apikeyInput !== `${key}`) return res.sendFile(invalidKey)
  if (!query) return res.json({ message: 'masukan parameter query' })
  var result = await mynimeku.Search(query)
  if (result > 1) return res.json({ message: 'anime not found!' })
  res.json(result)
  .catch(e => {
         	res.sendFile(error)
})
})

router.get('/mynimekuDetail', async(req, res) => {
  var link = req.query.link
	if (!link) return res.json({ message: 'masukan parameter Link' })
   var result = await mynimeku.animeDetail(link)
   res.json(result)
})

router.get('/mynimekuDownload', async(req, res) => {
  var link = req.query.link
	if (!link) return res.json({ message: 'masukan parameter Link' })
   var result = await mynimeku.downloadEps(link)
   res.json(result)
})

router.get('/storyanime', async(req, res) => {
  let res_ = await fetch('https://raw.githubusercontent.com/Arya-was/endak-tau/main/storyanime.json')
  let data = await res_.json()
  let json = data[Math.floor(Math.random() * data.length)]
  var dl_link = await dl(json)
  const buffer = await getBuffer(dl_link.medias[0].url)
  await fs.writeFileSync(__path +`/tmp/audio.mp4`, buffer)
  await res.sendFile(__path +`/tmp/audio.mp4`)
})
router.get('/dewabatch', async(req, res) => {
	var query = req.query.query
	if (!query) return res.json({ message: 'masukan parameter query' })
	var result = await scrapper.dewabatch(query)
	res.json({ result })
}) 
router.get('/anoboys', async(req, res) => {
	var query = req.query.query
	if (!query) return res.json({ message: 'masukan parameter query' })
	var result = await scrapper.anoboys(query)
	res.json({ result })
}) 
router.get('/manga', async(req, res) => {
	var query = req.query.query
	if (!query) return res.json({ message: 'masukan parameter query' })
	var result = await scrapper.manga(query)
	res.json({ result })
}) 
router.get('/animeplanet', async(req, res) => {
	var query = req.query.query
	if (!query) return res.json({ message: 'masukan parameter query' })
	var result = await scrapper.anime(query)
	res.json({ result })
}) 


module.exports = router
