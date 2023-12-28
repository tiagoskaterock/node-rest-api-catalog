const express = require('express')
const bodyParser = require('body-parser')
const mongojs = require('mongojs')

const db = mongojs('catalog', ['products'])

const app = express()

const port = 3000

app.use(bodyParser.json())



// home
app.get('/', function(req, res, next) {
	res.send('Hello World!!!')
})

// fetch all products
app.get('/api/products', function(req, res, next) {
	db.products.find(function (err, docs) {
		if(err) {
			res.send(err)
		}
		console.log('Products')
		res.json(docs)
	})
})

// fetch single product
app.get('/api/products/:_id', function(req, res, next) {
	db.products.findOne({ _id: mongojs.ObjectId(req.params._id)}, function (err, doc) {
		if(err) {
			res.send(err)
		}
		console.log(doc)
		res.json(doc)
	})
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
