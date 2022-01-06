const express = require('express');
const dbConnection = require('./database/connections');
const access_router = require('./routes/routes');
const cors = require('cors');
const path = require('path');
const app = express();
const passport = require('passport');
app.use(passport.initialize());
app.use(express.json());
const port = process.env.PORT || 3000;

dbConnection
    .authenticate()
    .then(() => {
        console.log('Connection has been enabled !');
        app.listen(port, () =>
            console.log(`nodes-app listening on port ${port}!`)
        );
    })
    .catch((err) => console.log('Unable to connect with database !', err));

app.use(cors());
app.use(express.static(path.join(__dirname, '/views/')));
app.use('/api', access_router);
app.get('*', (req, res) =>
    res.sendFile(path.join(__dirname, '/views/index.html'))
);
