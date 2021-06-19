// Setup web app

var exprees = require('express')
var app = exprees()

app.set('view engine', 'ejs')

var router = exprees.Router()

router.use(exprees.static('public'))

var webconfig = require('./webconfig')

function controller(name) {
    return require('./controllers/' + name + '-controller')
}

router.get('/', function (request, response) {
    controller('home').get(request, response)
})
app.use(webconfig.root, router)

//Start web sever
app.listen(1234, function () {
    console.log('Sever started OK')
})