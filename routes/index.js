var express = require('express');
var router = express.Router();
var MP = require ("mercadopago");


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/index', function(req, res, next) {
  var mp = new MP ("5494916186815975", "5TXUVnXyu3QECjIHaHtWEgKRbbS2VSO4");

    var preference = {
        "items": [
            {
                "title": "Zapatilla Blanca",
                "quantity": 1,
                "currency_id": "ARS", // Available currencies at: https://api.mercadopago.com/currencies
                "unit_price": 1010.0
            }
        ],
        "payer": "flopez@coasa.com.ar",
        "back_urls": { "success": "http://localhost:3000/success",
          "pending": "http://localhost:3000/pending",
          "failure": "http://localhost:3000/failure"
        }
    };

    mp.createPreference (preference, function (err, data){
        if (err) {
            res.send (err);
        } else {
          console.log(data);
          var status = data.status;
          var response = data.response;
          var init_point = data.response.sandbox_init_point;
          console.log(data);
            res.render('button', {status:status, response:response, init_point: init_point});
        }
    });

});

/* GET users listing. */
router.get('/success', function(req, res, next) {
  res.render('success');
});

/* GET users listing. */
router.get('/failure', function(req, res, next) {
  res.render('failure');
});

/* GET users listing. */
router.get('/pending', function(req, res, next) {
  res.render('pending');
});


module.exports = router;
