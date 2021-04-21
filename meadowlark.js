
const express = require('express')
const expressHandlebars = require('express-handlebars')
const fortune = require('./lib/fortune')
const app = express()
const port = process.env.PORT || 3000

//Configure Handlebars view engine
app.engine('handlebars', expressHandlebars({
    defaultLayout: 'main',
}))
app.set('view engine', 'handlebars')


app.get('/', (req, res) => res.render('home'))

app.get('/about', (req, res) => {
    res.render('about', { fortune: fortune.getFortune() })
})

app.use(express.static(__dirname+'/public'))
//Custom 404 Page
app.use((req, res) => {    
    res.status(404)
    res.render('404')
})

//Custom 500 Page
app.use((err, req, res, next) => {
    console.error(err.message)    
    res.status(500)
    res.render('500')
})

app.listen(port, () => console.log(
    `Server started listening on port ${port}; ` +
    'Press Ctrl-C to terminate. '
))

