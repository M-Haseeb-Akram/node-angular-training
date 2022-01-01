const express = require('express');
const access_router = require('./routes/routes');

const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;

app.use('/api', access_router);
app.get('/', (req, res) => res.send('Notes App'));

app.listen(port, () => console.log(`notes-app listening on port ${port}!`));
