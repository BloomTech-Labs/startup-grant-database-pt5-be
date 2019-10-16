const server = require('./server/server.js');

require('dotenv').config();

const port = process.env.PORT || 10000;

server.listen(port, () => {
    console.log(`Server is listening on port ${port}`); 
});