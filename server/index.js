const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

//Localhost
const conn = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'restoranas_v3'
});

//var conn = mysql.createConnection(process.env.JAWSDB_URL);

//HEROKU server
// const conn = mysql.createConnection({
//   host     : 'ou6zjjcqbi307lip.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
//   user     : 'nbiiabwbnzlzrf4p',
//   password : 'ljytjd8hp0oevo9p',
//   database : 'k8yvzge5zm4v1wgf'
// });

//KTU server
// const conn = mysql.createConnection({
//   host     : 'localhost',
//   user     : 'mandem',
//   password : 'ih1chooPhiemuw4e',
//   database : 'mandem'
// });

conn.connect(function(err){
  (err)? console.log(err) : console.log("all good my man with connection");
});

require('./routes/html_route')(app, conn);

// Handles any requests that don't match the ones above
// app.get('*', (req,res) =>{
//     res.sendFile(path.join(__dirname+'/client/build/index.html'));
// });

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
