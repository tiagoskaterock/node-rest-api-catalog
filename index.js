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
		res.json(doc)
	})
})

// add product
app.post('/api/products', function(req, res, next) {
	db.products.insert(req.body, function (err, doc) {
		if(err) {
			res.send(err)
		}
		res.json(doc)
		console.log('Adding product')
	})
})

// update product
app.put('/api/products/:_id', function(req, res, next) {
	db.products.findAndModify({query: {_id: mongojs.ObjectId(req.params._id)},
	update:{
		$set:{
			name: req.body.name,
			category: req.body.category,
			details: req.body.details
		}
	},
	new: true }, function(err, doc) {
		if(err) {
			res.send(err)
		}
		console.log('Updating product')
		res.json(doc)
	})
})

// delete product
app.delete('/api/products/:_id', function(req, res, next) {
	db.products.remove({_id: mongojs.ObjectId(req.params._id)}, function(err, doc) {
		if(err) {
			res.status(500).send(err)			
		}
		res.status(200).send('Product deleted')
	})	
})

app.listen(port, function() {
	console.log('Success! Server started on port ' + port)
})
