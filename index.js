// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

app.use(express.static('public'));

app.get("/", function(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


const isInvalidDate = (date) => date.toUTCString() === "Invalid Date"

app.get("/api/:date",(req, res) => {
    let date = new Date(req.params.date)

  if(isInvalidDate(date)){
    date = new Date(parseInt(+req.params.date))
  }

  if(isInvalidDate(date)){
    res.json({error: "Invalid Date"})
    return;
  }

  res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
});

app.get("/api",(req, res) => {
  res.json({
    unix: new Date().getTime(),
    utc: new Date().toUTCString()
  })
})

// app.get("/api/:date?", (req, res) => {
//   const date = new Date(req.params.date);
//   console.log(req.params.date);
//   if (!isNaN(date.getTime())) {
//     res.json({
//       unix: parseInt(date.getTime()),
//       utc: date.toUTCString()
//     });
//   } else if (!req.params.date) {
//     let currentDate = new Date();
//     res.json({
//       unix: parseInt(currentDate.getTime()),
//       utc: currentDate.toUTCString()
//     });
//   } else {
//     res.json({
//       error: "Invalid Date"
//     });
//   }
// });

// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
