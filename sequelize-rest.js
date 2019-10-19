const express = require('express');
const bodyParser = require('body-parser')
const bodyParserMiddleWare = bodyParser.json()
const Router = require('./Router')
const app = express();
const port = process.env.PORT || 4000;


app
    .use(bodyParserMiddleWare)
    .use(Router)
    .listen(port, ()=> console.log(`app is listening on port ${port}`))


