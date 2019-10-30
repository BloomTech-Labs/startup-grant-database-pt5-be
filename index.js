const server = require("./server/server.js");

require("dotenv").config();

const PORT = process.env.PORT || 10000;

server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
