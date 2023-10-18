const express = require('express');
const app = express();
const homeRoutes = require('./routes/home');
const shortUrl = require('./routes/url');

const PORT = 1337;

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

app.use('urlapi', shortUrl);
app.use('/', homeRoutes);


app.listen(PORT, () => {
    console.log("App is running in port:", PORT)
});