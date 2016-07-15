# slack-randomizer (for Heroku)

Returns random option from given array of strings separated by white-space.

Usage: /random option1 option2 option3

  * Clone to local
  * Init Heroku application (http://www.heroku.com) for Node.js, just follow instructions
  * Push to Heroku (again, follow instructions)
  * Add custom command integration to Slack. Command: /your-command-name (or just /random), URL: http://your-app-name.herokuapp.com, Method: POST
  * Start randoming!

Created with Node.js, Express and <3
