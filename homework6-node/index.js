var express = require('express');
var app = express();

var Animal = require('./Animal.js');
var Toy = require('./Toy.js');

app.use('/findToy', (req, res) => {
	var searchId = req.query.id;
	if (searchId) {
		Toy.findOne( { id: searchId }, (err, toy) => {
			if (err) {
				console.log(err);
				res.json({});
			}
			if (toy === null) {
				res.json({});
			}
			else {
				res.json(toy);
			}
			});
	}
	else {
		res.json({});
	}
	});
	
app.use('/findAnimals', (req, res) => {
	var query = {};
	if (req.query.species) {
		query.species = req.query.species;
	}
	if (req.query.trait) {
		query['traits'] = req.query.trait;
	}
	if (req.query.gender) {
		query.gender = req.query.gender;
	}
	
	if (Object.keys(query).length != 0) {
		Animal.find(query, '-_id name species breed gender age', (err, animals) => {
			if (err) {
				console.log(err);
				res.json({});
			}
			else {
				res.json(animals);
			}
		});
	}
	else {
		res.json({});
	}
	});
	
app.use('/animalsYoungerThan', (req, res) => {
	var age = req.query.age;
	if (age && !isNaN(age)) {
		Animal.find( {age: { $lt: age } }, '-_id name', (err, animals) => {
			if (err) {
				console.log(err);
				res.json({});
			}
			else {
				if (animals.length > 0) {
					let names = [];
					for (let i = 0; i < animals.length; i++) {
						names.push(animals[i].name);
					}
					res.json( {count: animals.length, names: names} );
				}
				else {
					res.json( {count: 0} );
				}
			}
		});
	}
	else {
		res.json({});
	}
	});
	
app.use('/calculatePrice', (req, res) => {
	var id = req.query.id;
	var qty = req.query.qty;
	if (id.length != qty.length) {
		res.json({});
	}
	
	var ids = [];
	var items = new Map();
	let i = 0;
	while (id[i]) {
		if (!isNaN(qty[i]) && qty[i] > 0) {
			if (!items.has(id[i])) {
				ids.push( {id: id[i]} );
				items.set(id[i], qty[i]);
			}
			else {
				let q = Number(items.get(id[i])) + Number(qty[i]);
				items.delete(id[i]);
				items.set(id[i], q);
			}
		}
		i++;
	}
	
	var query = { $or: ids };
	var resultArr = [];
	Toy.find(query, '-_id id price', (err, toys) => {
		if (err) {
			console.log(err);
			res.json({});
		}
		else {
			for (let j = 0; j < toys.length; j++) {
				let subTot = getSubTotal(toys[j], items);
				resultArr.push(subTot);
			}
			let totalPrice = 0;
			if (resultArr.length == 1) {
				console.log('subtotal = ' + resultArr[0].subtotal);
				totalPrice = resultArr[0].subtotal;
			}
			else if (resultArr.length == 0) {
				totalPrice = 0;
			}
			else {
				totalPrice = resultArr.reduce(getTotal);
			}
			console.log('totalPrice = ' + totalPrice);
			var result = {items: resultArr, totalPrice: totalPrice}
			res.json(result);
		}
	});
	});

app.use('/', (req, res) => {
	res.json({ msg : 'It works!' });
    });

app.listen(3000, () => {
	console.log('Listening on port 3000');
    });

// Computes the subtotal for a toy
function getSubTotal(item, items) {
	let qty = items.get(item.id);
	let toy = {};
	if (qty) {
		toy.item = item.id;
		toy.qty = qty;
		toy.subtotal = item.price * qty;
	}
	return toy;
}

function getTotal(total, sum) {
	return total.subtotal + sum.subtotal;
}


// Please do not delete the following line; we need it for testing!
module.exports = app;