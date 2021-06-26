var datasource = require('./datasource/simple-datasource');
var model = require('./model/model.js').create(datasource)

// Setup web app

var exprees = require('express')
var app = exprees()

app.set('view engine', 'ejs')
app.use(require('cookie-parser')())

var router = exprees.Router()
router.use(exprees.static('public'))
var webconfig = require('./webconfig');
var urlencodedParser = require('body-parser').urlencoded({
    extended: false
})

function controller(name) {
    return require('./controllers/' + name + '-controller')
}

router.get('/', function (request, response) {
    controller('home').get(request, response,webconfig,model)
})

router.get('/login', function (request, response) {
    controller('login').get(request, response, webconfig, model)
})

router.post('/login', urlencodedParser, function (request, response) {
    controller('login').post(request, response, webconfig, model)
})
router.get('/logout', function (request, response) {
    controller('logout').get(request,response,webconfig)
})
app.use(webconfig.root, router)

//Start web sever
app.listen(1234, function () {
    console.log('Sever started OK')
})