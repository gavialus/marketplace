require ('./config/config');

const express = require('express');
const app = express();

const bodyParser = require ('body-parser')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())



app.get('/aliscraper', function (req, res) {
  res.json ('Probando get')
});
app.post('/aliscraper:id', function (req, res) {

  let body = req.body
  res.json ({
    body
    })
  },

app.put('/aliscraper:id', function (req, res) {
  let id = req.params.id;

  res.json ({
    id
  })

});
app.delete('/', function (req, res) {
  res.json ('probando delete')
});



app.listen(process.env.PORT, function () {
  console.log('Example app listening on port 3000!');
});
