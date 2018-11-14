var mysql = require('mysql');
var sHTML;

sHTML = '<h1>Welcome</h1><p>'

var con = mysql.createConnection({
  host: "192.168.1.153",
  //port: '3306',
  user: "colouser",
  password: "colouser",
  database: "00_process_data"
});

/*
var sqlTest = con.connect(function(err) {
  if (err) throw err;
  con.query("SELECT * FROM 01towers WHERE Site_ID = '1-01-01001-002'", function (err, result, fields) {
    if (err) throw err;
    console.log(result);

    sendMail(result[0].Site_ID, result[0].Legacy, result[0].Region);

    /*
    data.id = String(result[0].Site_ID);
    data.legacy = String(result[0].Legacy);
    data.region = String(result[0].Region);
    */

  });
});*/


 var http = require('http');

http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(sHTML);
}).listen(8080);



function sendMail(id, legacy, region) {


  var nodemailer = require('nodemailer');

  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'colo.apollotowers@gmail.com',
      pass: 'JdDLi9r2JGfF'
    }
  });

  var mailOptions = {
    from: 'colo.apollotowers@gmail.com',
    to: 'charles.richeux@apollo-towers.com',
    subject: 'First Step to automatic emails for prevalidation',
    html: sHTML
    //'<h1>Welcome</h1><p>' + id + ', ' + legacy + ', ' + region + '</p>' + '<table style="width:100%">  <tr> <th>Firstname</th>    <th>Lastname</th> <th>Age</th>  </tr>  <tr>    <td>Jill</td>    <td>Smith</td>    <td>50</td>  </tr>  <tr>    <td>Eve</td>    <td>Jackson</td>    <td>94</td>  </tr></table> '
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}
