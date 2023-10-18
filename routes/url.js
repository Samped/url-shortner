const express = require('express');
const router = express.Router();
// const { nanoid } = require('nanoid'); 
const createDB = require('../config/db');
const Url = require('../models/urlModel');



const baseUrl = "localhost:1337/urlapi";


createDB.sync().then(() => {
    console.log("Db running");
});

//post api call
router.post('/', async (req, res) => {
    try {
        const { longUrl } = req.body;
        //longUrl -> id
        const shortId = Math.random();
        //store in db
        const shortUrl = await Url.create({
            longUrl,
            shortUrl: shortId,
        });
        res.status(200).json({
            status: 'ok',
            shortUrl: `${baseUrl}/${shortId}`
        })


    } catch (e) {
        console.error(e);
        res.status(500).send(e);
    }
});

router.get('/:short', async(req, res) => {
    let shortId = res.params.short;
    try {
        //get longUrl from database
        let Url = await Url.findOne({
            where: {
                shortUrl: shortId
            }
        });
        if(!Url) {
           return res.status(404).send("Invalid short Url");
        }
        return res.redirect(Url.longUrl)

    } catch (e) {
        return res.status(500).send(e);
    }
})



module.exports = router;