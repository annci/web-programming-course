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
		Animal.find(query, 'name species breed gender age', (err, animals) => {
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
		Animal.find( {age: { $lt: age } }, 'name', (err, animals) => {
			if (err) {
				console.log(err);
				res.json({});
			}
			else {
				if (animals.length > 0) {
					res.json( {count: animals.length, names: animals} );
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

app.use('/', (req, res) => {
	res.json({ msg : 'It works!' });
    });

app.listen(3000, () => {
	console.log('Listening on port 3000');
    });



// Please do not delete the following line; we need it for testing!
module.exports = app;