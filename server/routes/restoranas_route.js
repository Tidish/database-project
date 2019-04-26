const mysql = require('mysql');
const path = require('path');

module.exports = (app, conn) => {
  const messageSuccess = "Irasas sekmingai istrintas";


  app.get('/restoranas', (req, res) => {
    conn.query("SELECT * FROM restoranas", (err, data) => {
      if (err) throw err;
      res.json({results: data});
    });
  });

  // app.post('/imone/del', (req, res) => {
  //   let id = req.query.id;
  //   conn.query("Delete FROM imone WHERE id_IMONE = " + mysql.escape(id), (err, data) => {
  //     if (err) {
  //       res.status(500).json({ errors: {globalErr: err } });
  //     }
  //     else{
  //       res.status(200).json({ message: { globalSucc: messageSuccess }})
  //     }
  //   });
  // });
  //
  // app.post('/imone/update', (req, res) => {
  //   var sql = "UPDATE imone SET Pavadinimas = ?, Adresas = ?, Telefono_numeris = ? WHERE id_IMONE = ?";
  //   conn.query(sql, [req.body.Pavadinimas, req.body.Adresas, req.body.Telefono_numeris, req.body.id_IMONE], (err, data) => {
  //     if (err) {
  //       res.status(500).json({ errors: {globalErr: err } });
  //     }
  //     else{
  //       res.sendStatus(200);
  //     }
  //   });
  // });
  //
  // app.post('/imone/add', (req, res) => {
  //   console.log(req.body);
  //   var sql = "INSERT INTO imone (Pavadinimas, Adresas, Telefono_numeris) VALUES (?, ?, ?)";
  //   conn.query(sql, [req.body.Pavadinimas, req.body.Adresas, req.body.Telefono_numeris], (err, data) => {
  //     if (err) {
  //       res.status(500).json({ errors: {globalErr: err } });
  //     }
  //     else{
  //       res.sendStatus(200);
  //     }
  //   });
  // });
}