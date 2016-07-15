const express = require('express');
const app = express();
const bodyParser = require('body-parser');

let port = process.env.PORT || 3000;
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

let zeroLengthAnswers = [
	'Ei löytynyt arvottavaa.',
	'Vastaus on Kanada!',
	'Älä ny jaksa taas.'
];

let oneLengthAnswers = [
	'Tarvitseeko tuota jotenkin arpoa?',
	'Saa jotain vaihtoehtojakin antaa.',
	'Ei ainakaan toi.'
];

let selectRandomFrom = function(arr) {
	let index = Math.floor(Math.random() * arr.length);
	let randomOption = arr[index];
	return [index, randomOption];
};

app.get('/', (req, res) => {
	res.json({ text: 'Hello, world!' });
});

app.post('/', (req, res) => {
	let text = req.body.text || '';
	let options = text.trim().split(' ').filter((option) => { return option !== ''; });

	switch (options.length) {
	case 0:
		console.log(`DEBUG: options: ${options}`);
		var [index, responseText] = selectRandomFrom(zeroLengthAnswers);
		res.json({
			'response_type': 'in_channel',
			'text': responseText
		});
		break;
	case 1:
		console.log(`DEBUG: options: ${options}`);
		var [index, responseText] = selectRandomFrom(oneLengthAnswers);
		res.json({
			'response_type': 'in_channel',
			'text': responseText
		});
		break;
	default:
		var [index, randomOption] = selectRandomFrom(options);
		console.log(`DEBUG: options: ${options}, randomIndex: ${index}, randomOption: ${randomOption}`);
		res.json({
			'response_type': 'in_channel',
			'text': `Noppa valitsee: ${randomOption}`
		});
		break;
	}

});

app.listen(port, () => {
	console.log(`Example app listening on port ${port}!`);
});
