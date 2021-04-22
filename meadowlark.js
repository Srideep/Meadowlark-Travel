
const express = require('express')
const expressHandlebars = require('express-handlebars')
const handlers = require('./lib/handlers')
const app = express()
const port = process.env.PORT || 3000

//Configure Handlebars view engine
app.engine('handlebars', expressHandlebars({
    defaultLayout: 'main',
}))
app.set('view engine', 'handlebars')


app.get('/', handlers.home)

app.get('/about', handlers.about)

app.use(express.static(__dirname+'/public'))
//Custom 404 Page
app.use(handlers.notFound)

//Custom 500 Page
app.use(handlers.serverError)

app.listen(port, () => console.log(
    `Server started listening on port ${port}; ` +
    'Press Ctrl-C to terminate. '
))

