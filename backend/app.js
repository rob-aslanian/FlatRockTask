const express    = require('express'),
      bodyParser = require('body-parser'),
      router = require('./routes/main.route'),
      fileUload = require('express-fileupload'),
      cors = require('cors'),
      db = require('./db')
      app = express();



app.use(bodyParser.json());
app.use(fileUload())
app.use(cors())

router(app)


app.listen(4256 , () => {
    console.log("Server is running");  
})