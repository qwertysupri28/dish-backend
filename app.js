const express = require('express');
const app = express();
var cors = require('cors');
const uploadDatainDB = require('./src/uploadDatainDB');
const dishDetails = require('./src/dishDetails');
const dishDescription = require('./src/dishDescription');

app.options('*', cors());
app.use(cors());
app.use(express.json({ limit: '50mb', extended: true }));

app.use("/uploadDatainDB", uploadDatainDB);
app.use("/dishDetails", dishDetails);
app.use("/dishDescription", dishDescription);

app.listen(3002, () => console.log(`Listening on port 3002...`));

