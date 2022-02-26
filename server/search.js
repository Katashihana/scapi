const express = require('express')
var router = express.Router();
__path = process.cwd()
const fs = require('fs')
const trending = require('@freetube/yt-trending-scraper')
const traceAPI = require('trace.moe')
const Client = traceAPI.Client
const traceClient = new Client();
const { getBuffer } = require('../lib/function')

//scraper
const { pinterest, randomTiktok, konachan } = require('../scraper/index') 
const { wallpapercave, wallpaperscraft, wallpaperflare, alphacoders } = require('../scraper/wallpaper')
const { stickerSearch } = require('../scraper/stickerpack')
const { savetikVideo } = require('../scraper/savetik')
const { happymodSearch } = require('../scraper/happymod')
const { searchIlust } = require('../scraper/pixiv')
const { tiktokHastag } = require('../scraper/tiktok_search')
const scrapper = require('../scraper/scrapper')
const scrp = require('../scraper/scrape21')
const tod = require('../scraper/testapi')


//Biar Result nya 20
//Disable Console Log
router.get('/google', async(req, res) => {
	var query = req.query.query
	if (!query) return res.json({ message: 'masukan parameter query' })
	var google = require('google-it')
	var result = google({'query' : `${query}`, limit: 20, disableConsole: true }).then(result => {
	res.json({ result })
	})
})     

router.get('/pinterest', async(req, res) => {
	var query = req.query.query
	if (!query) return res.json({ message: 'masukan parameter query' })
	var result = await pinterest(query)
	res.json({ result })
})
router.get('/pixiv', async(req, res) => {
	var query = req.query.query
	if (!query) return res.json({ message: 'masukan parameter query' })
	var result = await searchIlust(query)
	res.json({ result })
})
router.get('/konachan', async(req, res) => {
	var query = req.query.query
	if (!query) return res.json({ message: 'masukan parameter query' })
	var img = await konachan(query)
	const result = img[Math.floor(Math.random() * (img.length))]
	var data = await getBuffer(result)
    	await fs.writeFileSync(__path +'/tmp/konachan.png', data)
   	await res.sendFile(__path +'/tmp/konachan.png')
})
router.get('/alphacoders', async(req, res) => {
	var query = req.query.query
	if (!query) return res.json({ message: 'masukan parameter query' })
	var img = await alphacoders(query)
	const result = img[Math.floor(Math.random() * (img.length))]
	var data = await getBuffer(result)
    	await fs.writeFileSync(__path +'/tmp/image.png', data)
   	await res.sendFile(__path +'/tmp/image.png')
})
router.get('/wallpapercave', async(req, res) => {
	var query = req.query.query
	if (!query) return res.json({ message: 'masukan parameter query' })
	var img = await wallpapercave(query)
	const result = img[Math.floor(Math.random() * (img.length))]
	var data = await getBuffer(result)
    	await fs.writeFileSync(__path +'/tmp/image.png', data)
   	await res.sendFile(__path +'/tmp/image.png')
})
router.get('/wallpaperscraft', async(req, res) => {
	var query = req.query.query
	if (!query) return res.json({ message: 'masukan parameter query' })
	var img = await wallpaperscraft(query)
	const result = img[Math.floor(Math.random() * (img.length))]
	var data = await getBuffer(result)
    	await fs.writeFileSync(__path +'/tmp/image.png', data)
   	await res.sendFile(__path +'/tmp/image.png')
})
router.get('/wallpaperflare', async(req, res) => {
	var query = req.query.query
	if (!query) return res.json({ message: 'masukan parameter query' })
	var img = await wallpaperflare(query)
	const result = img[Math.floor(Math.random() * (img.length))]
	var data = await getBuffer(result)
    	await fs.writeFileSync(__path +'/tmp/image.png', data)
   	await res.sendFile(__path +'/tmp/image.png')
})
router.get('/tiktok', async(req, res) => {
	var query = req.query.query
	if (!query) return res.json({ message: 'masukan parameter query' })
	var result = await tiktokHastag(query)
	res.json({ result })
})
router.get('/tiktokHastag', async(req, res) => {
	var query = req.query.query
	if (!query) return res.json({ message: 'masukan parameter query' })
	var result = await randomTiktok(query)
	res.json({ result })
})
router.get('/randomtiktok', async(req, res) => {
	var result = await savetikVideo()
	res.json({ result })
})
router.get('/happymod', async(req, res) => {
	var query = req.query.query
	if (!query) return res.json({ message: 'masukan parameter query' })
	var result = await happymodSearch(query)
	res.json({ result })
})
router.get('/sticker', async(req, res) => {
	var query = req.query.query
	if (!query) return res.json({ message: 'masukan parameter query' })
	var result = await stickerSearch(query)
	res.json({ result })
})
router.get('/searchgore', async(req, res) => {
	var query = req.query.query
	if (!query) return res.json({ message: 'masukan parameter query' })
	var result = await scrapper.searchgore(query)
	res.json({ result })
}) 
router.get('/sfilesearch', async(req, res) => {
	var query = req.query.query
	if (!query) return res.json({ message: 'masukan parameter query' })
	var result = await tod.sfilesearch(query)
	res.json({ result })
}) 
router.get('/palingmurah', async(req, res) => {
	var query = req.query.query
	if (!query) return res.json({ message: 'masukan parameter query' })
	var result = await tod.palingmurah(query)
	res.json({ result })
}) 
router.get('/mui', async(req, res) => {
	var query = req.query.query
	if (!query) return res.json({ message: 'masukan parameter query' })
	var result = await tod.muihalal(query)
	res.json({ result })
}) 
router.get('/youtube/trending/indonesia/default', async(req, res) => {
	const parameters = {
    geoLocation: 'ID',
    parseCreatorOnRise: false,
    page: 'default'
}
	var result = await ytrend.scrape_trending_page(parameters)
	res.json({ result })
}) 
router.get('/youtube/trending/indonesia/music', async(req, res) => {
	const paramete = {
    geoLocation: 'ID',
    parseCreatorOnRise: false,
    page: 'music'
}
	var result = await ytrend.scrape_trending_page(paramete)
	res.json({ result })
}) 
router.get('/youtube/trending/indonesia/gamers', async(req, res) => {
	const parame = {
    geoLocation: 'ID',
    parseCreatorOnRise: false,
    page: 'gaming'
}
	var result = await ytrend.scrape_trending_page(parame)
	res.json({ result })
}) 
router.get('/youtube/trending/indonesia/movie', async(req, res) => {
	const param = {
    geoLocation: 'ID',
    parseCreatorOnRise: false,
    page: 'movies'
}
	var result = await ytrend.scrape_trending_page(param)
	res.json({ result })
}) 
router.get('/wait', async(req, res) => {
	var link = req.query.link
	if (!link) return res.json({ message: 'masukan parameter Link' })
	var hasil = await traceClient.getSimilarFromURL(link)
	try {
	res.json(hasil)
  } catch(err) {
		console.log(err)
		res.json({ message: 'Ups, error' })
	}
})
router.get('/playstore', async(req, res) => {
	var query = req.query.query
	if (!query) return res.json({ message: 'masukan parameter query' })
	var result = await scrp.playstore(query)
	res.json({ result })
}) 
router.get('/kodepos', async(req, res) => {
	var kota = req.query.kota
	if (!kota) return res.json({ message: 'masukan parameter kota' })
	var result = await scrp.kodepos(kota)
	res.json({ result })
}) 
router.get('/jalantikus', async(req, res) => {
	var query = req.query.query
	if (!query) return res.json({ message: 'masukan parameter query' })
	var result = await scrp.jalantikus(query)
	res.json({ result })
}) 

module.exports = router
