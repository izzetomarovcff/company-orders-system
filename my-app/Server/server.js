const express = require('express');
const app = express();
const mysql = require('mysql2');
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'company-orders-system',
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL database:', err);
    return;
  }
  console.log('Connected to MySQL database!');
});


app.get('/orders', (req, res) => {      
  connection.query('SELECT * FROM orders', (err, results) => {
    if (err) {
      console.error('Error executing MySQL query:', err);
      res.status(500).json({ error: 'Failed to retrieve data' });
      return;
    }
    res.json(results);
  });
});

app.post('/new', (req, res) => {
  const { owner_name, owner_surname, owner_phone, ordered_date, will_finished, place, first_pay} = req.body; // Assuming you're sending name and email in the request body
  // Perform the MySQL query to insert the data
  connection.query('INSERT INTO orders (owner_name, owner_surname, owner_phone, ordered_date, will_finished, place, first_pay) VALUES (?, ?, ?, ?, ?, ?, ?)', [owner_name, owner_surname, owner_phone, ordered_date, will_finished, place, first_pay], (err, result) => {
    if (err) {
      console.error('Error inserting data into MySQL:', err);
      res.status(500).json({ error: 'Failed to insert data' });
      return;
    }
    res.json({ message: 'Data inserted successfully' });
  });
});

app.delete('/delete/:id', (req, res) => {
  const id = req.params.id;

  // Perform the MySQL query to delete the record
  connection.query('DELETE FROM orders WHERE order_id = ?', [id], (err, result) => {
    if (err) {
      console.error('Error deleting record from MySQL:', err);
      res.status(500).json({ error: 'Failed to delete record' });
      return;
    }
    res.json({ message: 'Record deleted successfully' });
  });
});
app.put('/edit/:id', (req,res)=>{
  const id = req.params.id;
  const { owner_name, owner_surname, owner_phone, ordered_date, will_finished, place, first_pay } = req.body;
  connection.query('UPDATE orders SET owner_name = ?, owner_surname = ?, owner_phone = ?, ordered_date = ?, will_finished = ?, place = ?, first_pay = ? WHERE order_id = ?', [owner_name, owner_surname, owner_phone, ordered_date, will_finished, place, first_pay, id], (err, result) => {
    if (err) {
      console.error('Error editing record from MySQL:', err);
      res.status(500).json({ error: 'Failed to edit record' });
      return;
    }
    res.json({ message: 'Record edited successfully' });
  });
})
// Other server setup and configurations

app.listen(3001, () => {
  console.log('Server listening on port 3001');
});
