const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000
let count=0

const Middleware = (req, res, next) => {
    if (count < 5) {
        count = count +1
        console.log('count : ', count)
        next()    
    } else {
        res.status(429).end()
    }
}

//app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.listen(port, () => console.log(`listening on port ${port}`))
//app.get('/', (req,res) => res.send('hello'))
app.post('/messages',Middleware, (req,res,next) => {
        console.log('req.body is : ', req.body)
        if(JSON.stringify(req.body) === JSON.stringify({})) {
            res.status(400)}
            res.json({message: "Message received loud and clear!" 
        })
})

