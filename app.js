const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const config = require('config');

// Feel free to change these =)
const zeroLengthAnswers = config.get('zeroLengthAnswers');
const oneLengthAnswers = config.get('oneLengthAnswers');

const applicationToken = config.get('applicationToken');
const applicationTeamId = config.get('applicationTeamId');

let validateRequest = function({ token, team_id } = {}) {
	if (!token || !team_id) {
		return false;
	}

	return token === applicationToken && team_id === applicationTeamId;
};

let selectRandomFrom = function(arr) {
	let index = Math.floor(Math.random() * arr.length);
	let randomOption = arr[index];
	return [index, randomOption];
};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/', (req, res) => {
	console.log(req.body);

	if (!validateRequest(req.body)) {
		res.status(403).json({ 'error': 'Unauthorized request' });
		return;
	}

	let text = req.body.text || '';

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

		if (options[0].toLowerCase() === 'help') {
			let helpText = `Add options as whitespace separated strings, such as: /random option1 option 2 option3`;
			res.json({
				'response_type': 'ephemeral',
				'text': helpText
			});
		} else {
			([index, randomOption] = selectRandomFrom(oneLengthAnswers));
			res.json({
				'response_type': 'in_channel',
				'text': randomOption
			});
		}
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
