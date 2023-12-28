const express = require('express')
const bodyParser = require('body-parser')
const mongojs = require('mongojs')

const app = express()

const port = 3000

app.use(bodyParser.json())

// home
app.get('/', function(req, res, next) {
	res.send('Hello World!!!')
})

// fetch all products
app.get('/api/products', function(req, res, next) {
	res.send('All products')
})

// fetch single product
app.get('/api/products/:id', function(req, res, next) {
	res.send('Single product ' + req.params.id)
})

// add product
app.post('/api/products', function(req, res, next) {
	res.send('Add product')
})

// update product
app.put('/api/products:id', function(req, res, next) {
	res.send('Update product')
})

// delete product
app.delete('/api/products/:id', function(req, res, next) {
	res.send('Delete product')
})

app.listen(port, function() {
	console.log('Success! Server started on port ' + port)
})
