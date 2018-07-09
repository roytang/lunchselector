# Stuff

A slackbot to select a random place for lunch

This repo is based on https://github.com/aatkin/slack-randomizer (it's not a fork because I didn't think I'd be pushing it back to git when I first made it)

The list of choices is under config/production.json under "eightball"

# slack-randomizer (for Heroku)

Returns random option from given array of strings separated by white-space.

Usage: /random option1 option2 option3

  * Clone to local
  * Create [Heroku application (Node.js)](https://devcenter.heroku.com/articles/getting-started-with-nodejs)
  * Push to Heroku: `git push heroku master` (via Heroku toolbelt)
  * Set [config variables](https://devcenter.heroku.com/articles/config-vars) in Heroku
    * `heroku config:set APPLICATION_TOKEN=your-token`
    * `heroku config:set APPLICATION_TEAM_ID=your-team-id`
  * Add custom command to Slack. Command: /your-command-name (or just /random), URL: http://your-app-name.herokuapp.com, Method: POST
  * Start randoming!

Created with Node.js, Express and <3
