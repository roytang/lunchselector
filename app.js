const express = require('express');
const app = express();
const bodyParser = require('body-parser');

let port = process.env.PORT || 3000;
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
	res.json({ text: 'Hello, world!' });
});

app.post('/', (req, res) => {
	let text = req.body.text || '';
	let options = text.trim().split(' ').filter((option) => { return option !== ''; });

	switch (options.length) {
	case 0:
		console.log(`DEBUG: options: ${options}, randomIndex: ${index}, randomOption: ${randomOption}`);
		res.json({
			'response_type': 'in_channel',
			'text': 'Ei löytynyt arvottavaa.'
		});
		break;
	case 1:
		console.log(`DEBUG: options: ${options}, randomIndex: ${index}, randomOption: ${randomOption}`);
		res.json({
			'response_type': 'in_channel',
			'text': 'Tarvitseeko tuota jotenkin arpoa?'
		});
		break;
	default:
		let index = Math.floor(Math.random() * options.length);
		let randomOption = options[index];
		console.log(`DEBUG: options: ${options}, randomIndex: ${index}, randomOption: ${randomOption}`);
		res.json({
			'response_type': 'in_channel',
			'text': `Noppa valitsee: ${randomOption}`
		});
		break;
	}

});

app.listen(port, () => {
	console.log('Example app listening on port 3000!');
});
