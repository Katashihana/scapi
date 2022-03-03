__path = process.cwd()

var express = require('express');
var router = express.Router();

router.get('/', async(req, res) => {
	res.sendFile(__path + '/views/first.html')
})
router.get('/api', async(req, res) => {
	res.sendFile(__path + '/views/index.html')
})
router.get('/css/style.css', async(req, res) => {
	res.sendFile(__path + '/views/css/style.css')
})

router.get('/config', (req, res) => {
    config = {
        status: true,
        result: {
            prefix : 'Multi Prefix',
            namabot: 'Katashi Bot',
            namaowner: 'Katashi Hana',
            instagram: 'k4t4sh1._',
            github : 'https:\/\/github.com\/',
        }
    }
    res.json(config)
})

//Kalo page yang di cari engga ada, nanti muncul ini:v
router.use(function (req, res) {
res.status(404)
.sendFile(__path + '/views/404.html')
});


module.exports = router
