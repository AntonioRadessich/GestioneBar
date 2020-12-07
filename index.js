const app = require('./lib/app.js');
require('dotenv').config();

const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});