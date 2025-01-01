const express = require('express');
const db = require('./db');
require('./websocket');

const app = express();
const PORT = 3000;




app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
