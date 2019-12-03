const express = require("express");
const bodyParser = require("body-parser");
  
const app = express();
  
const urlencodedParser = bodyParser.urlencoded({extended: false});
  
app.get("/DAS", urlencodedParser, function (request, response) {
    response.sendFile(__dirname + "/index.html");
});

app.get("/config.json", urlencodedParser, function (request, response) {
    response.sendFile(__dirname + "/config.json");
});

app.get("/myscript.js", urlencodedParser, function (request, response) {
    response.sendFile(__dirname + "/myscript.js");
});

var htmltable = '';

app.get("/database", urlencodedParser, function (request, response) {
    response.setHeader("UserId", 12);
    response.setHeader("Content-Type", "text/html; charset=utf-8;");
    response.write(htmltable  + '</table>');
    response.end();
});
  
app.listen(80);
console.log('Server running on port 80');

var mysql = require('mysql');
 
console.log('Get connection ...');
 
var conn = mysql.createConnection({
  database: 'das_bd',
  host: "localhost",
  user: "root",
  password: "1234"
});
 
conn.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

var fs=require('fs');
var data=fs.readFileSync('config.json');
var config=JSON.parse(data);
console.log(config);

var sql1 = "DROP TABLE IF EXISTS DAS_TABLE;";
 
    conn.query(sql1, function(err, results) {
        if (err) throw err;
        console.log("Table dropped");
    });

var sql2 = "CREATE TABLE DAS_TABLE (";
htmltable = '<table border="1" width="100%" cellpadding="5">';


var tmp = " ";
htmltable += '<tr>';

for (x in config){
      if(config[x] == 'string'){
		sql2 += tmp;
		tmp = ", ";
		htmltable += '<th>' + x + '</th>';
		sql2 += x.replace(/\s+/g, '_') + " VARCHAR(256)";
      }
      else if(config[x] == 'number'){
		sql2 += tmp;
		tmp = ", ";
		htmltable += '<th>' + x + '</th>';
		sql2 += x.replace(/\s+/g, '_') + " INT";
      }
      else if (x == "resources")
      {
        for (y in config[x]){
          for (z in config[x][y]){
            if(config[x][y][z] == 'string'){
			  sql2 += tmp;
			  tmp = ", ";
			  htmltable += '<th>' + config[x][y].name+ ': ' + z + '</th>';
              sql2 +=  (config[x][y].name).replace(/\s+/g, '_') + "_" + z.replace(/\s+/g, '_') + " VARCHAR(256)";
            }
            else if(config[x][y][z] == 'number'){
			  sql2 += tmp;
			  tmp = ", ";
			  htmltable += '<th>'+ config[x][y].name+ ': ' + z + '</th>';
              sql2 += (config[x][y].name).replace(/\s+/g, '_') + "_" + z.replace(/\s+/g, '_') + " INT";
            }
          }
        }
      }
}
sql2 += " );"

htmltable += '</tr>';

conn.query(sql2, function(err, results) {
        if (err) throw err;
        console.log("Table created");
    });
	

app.post("/DAS", urlencodedParser, function (request, response) {
    console.log(request.body);
	for(x in request.body)
	{
		if(request.body[x] == '')
		{
			console.log("invalid data, not saved");
			response.setHeader("UserId", 12);
			response.setHeader("Content-Type", "text/html; charset=utf-8;");
			response.write("<h3>Данные введены неверно</h3><br>Форма не была сохранена</br><br> Пожалуйста заполните все поля</br>");
			response.end();
			return;
		}
	}
	response.sendFile(__dirname + "/index.html");
	
	htmltable += '<tr>';
	var sql3 = "Insert into DAS_TABLE "  + " Values (";
	
	var temp = " " 
	for(x in request.body)
	{
		htmltable += '<td>' + request.body[x] + '</td>';
		sql3 += temp;
		temp = ", ";
		if(x[0] == 't')
		{
			sql3 +=  "'";
			sql3 += request.body[x];
			sql3 +=  "'";
		}
		if(x[0] == 'n')
		{
			sql3 += request.body[x];
		}
	}
	
	htmltable += '</tr>';
	
	sql3 += " );";
//	console.log(sql3);
 
	conn.query(sql3, function(err, results) {
		if (err) throw err;
		console.log("Insert a record");
	})
});
	
