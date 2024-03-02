const express = require("express");
const multer = require("multer");//Multer is used for uploading the files in the html form
const wordConverter = require("docx-pdf");

var path = require("path");//path module includes a number of functions to work with the files

const bodyparser = require("body-parser");//used to parse diffrent type of data included in the body and convert them into javascript object.

const app = express(); //express provides a set of methods that can be used to configure and run the application

app.use(express.static("uploads"));//used to serve the static files in the uploads directory.
app.use(bodyparser.urlencoded({ extended: false }));//urlencodeed:-is used to parse the urlencoded data submitted in the body of an HTTP request. It takes an options object as an argument, and the extended option.
//querystring library (when extended is false) or with the qs library (when extended is true)
app.use(bodyparser.json());

var storage = multer.diskStorage({
    destination: function (req,file,cb){
        cb(null, "uploads");
    },
    filename: function(req,file,cb){
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

var upload = multer({storage: storage});

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
  });

  app.post("/docxtopdf", upload.single("word"), (req, res) => {
    let outputpath = Date.now() + "output.pdf";
    wordConverter('./wordfile.docx', './result.pdf', function (err, result) {
      if (err) {
        console.log(err);
      }
      res.download(outputpath,() => {
   
      })
    });
  });

  app.listen(5000, () => {
    console.log("App is listening on port 5000");
  });
