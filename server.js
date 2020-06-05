//new project
'use strict';

let express = require('express');
let cors = require('cors');
let prettyBytes = require('pretty-bytes'); //to convert file size
let multer = require('multer');
let upload = multer({ dest: 'assets/' });
// require and use "multer"...

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
     res.sendFile(process.cwd() + '/views/index.html');
  });

app.get('/hello', function(req, res){
  res.json({greetings: "Hello, API"});
});

app.post('/api/fileanalyse', upload.single('upfile'), (req, res, next) => {
  // req.file is the `upfile` file
  // req.body will hold the text fields, if there were any
  let fileName = req.file.originalname;
  let fileSize = req.file.size;
  let readSize = prettyBytes(fileSize, {bits: true});
  
  res.json({"fileName": fileName, "size":readSize, "sizeInBytes": fileSize});
});


app.listen(process.env.PORT || 3000, function () {
  console.log('Node.js listening ...');
});
