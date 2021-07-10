var datasource = require('./datasource/simple-datasource');
var model = require('./model/model.js').create(datasource)

// Setup web app

var exprees = require('express')
var app = exprees()

app.set('view engine', 'ejs')
app.use(require('cookie-parser')())

var multer = require('multer')
var upload = multer({
    dest: 'tmp/'
})

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
    controller('home').get(request, response, webconfig, model)
})

router.get('/login', function (request, response) {
    controller('login').get(request, response, webconfig, model)
})

router.post('/login', urlencodedParser, function (request, response) {
    controller('login').post(request, response, webconfig, model)
})

router.get('/logout', function (request, response) {
    controller('logout').get(request, response, webconfig)
})

router.get('/edit-general-info', function (request, response) {
    controller('edit-general-info').get(request, response, webconfig, model)
})

router.post('/edit-general-info', upload.single('featureImage'), function (request, response) {
    controller('edit-general-info').post(request, response, webconfig, model)
})

router.get('/edit-about', function (request, response) {
    controller('edit-about').get(request,response,webconfig,model)
})

router.post('/edit-about', urlencodedParser, function (request, response) {
    controller('edit-about').post(request,response,webconfig,model)
})

app.use(webconfig.root, router)

//Start web sever
app.listen(1269, function () {
    console.log('Sever started OK')
})