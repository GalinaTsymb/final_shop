const express = require('express');
const bodyParser = require("body-parser");
const cors = require('cors');
const router  = require('./routes/index');
const errorHandler = require('./middleware/ErrorHandlingMiddleware');

const app = express();
app.use(cors());

//делаем наш парсинг в формате json
app.use(bodyParser.json());

// парсит запросы по типу: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/images', express.static(__dirname + '/static/images'));

app.use('/api', router);


app.use(errorHandler);
app.listen(process.env.PORT || 3200, () => console.log(`Server started!`));
