const app = require('./lib/app.js');

/**
 * https://devcenter.heroku.com/articles/preparing-a-codebase-for-heroku-deployment#4-listen-on-the-correct-port
 */
const port = process.env.PORT || 4571;

app.listen(port, () => {
    console.log(Server listening on port ${port});
});

