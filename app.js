const express = require('express');
const app = express();
const bodyParser = require('body-parser');

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

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
	res.json({ 'guide': `Post to '/', and add options as whitespace separated strings into post data, such as text='option1 option 2 option3'` });
});

app.post('/', (req, res) => {
	let text = req.body.text || '';
	console.log(text);

	let options = text.trim().split(' ').filter((option) => { return option !== ''; });
	let index;
	let randomOption;

	switch (options.length) {
	case 0:
		console.log(`DEBUG: options: ${options}`);
		([index, randomOption] = selectRandomFrom(zeroLengthAnswers));
		res.json({
			'response_type': 'in_channel',
			'text': randomOption
		});
		break;
	case 1:
		console.log(`DEBUG: options: ${options}`);
		([index, randomOption] = selectRandomFrom(oneLengthAnswers));
		res.json({
			'response_type': 'in_channel',
			'text': randomOption
		});
		break;
	default:
		([index, randomOption] = selectRandomFrom(options));
		console.log(`DEBUG: options: ${options}, randomIndex: ${index}, randomOption: ${randomOption}`);
		res.json({
			'response_type': 'in_channel',
			'text': `Noppa valitsee: ${randomOption}`
		});
		break;
	}

});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
	console.log(`Slack randomizer is now running on port ${PORT}!`);
});
