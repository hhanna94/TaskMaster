const express = require('express');
const cors = require('cors');
const app = express();
const cookies = require('cookie-parser');

require('dotenv').config();
require('./server/config/mongoose.config'); 

app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(express.json()); 
app.use(cookies());
app.use(express.urlencoded({ extended: true })); 

require('./server/routes/user.routes')(app);
require('./server/routes/task.routes')(app);

app.listen(8000, () => {
    console.log("Listening at Port 8000")
})

