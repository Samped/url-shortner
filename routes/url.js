const express = require('express');
const router = express.Router();

//post api call
router.post('/', async (req, res) => {
    try {
        const { longUrl } = req.body;

        
    } catch (e) {
        console.error(e)
    }
})



module.exports = router;