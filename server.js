const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'grocery_store'
});

db.connect((err) => {
    if (err) throw err;
    console.log('Database connected');
});

app.post('/signup', (req, res) => {
    const { username, password, email } = req.body;
    const sql = 'INSERT INTO users (username, password, email) VALUES (?, ?, ?)';
    db.query(sql, [username, password, email], (err, result) => {
        if (err) throw err;
        res.send('User registered');
    });
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const sql = 'SELECT * FROM users WHERE username = ? AND password = ?';
    db.query(sql, [username, password], (err, results) => {
        if (err) throw err;
        if (results.length > 0) {
            res.send('Login successful');
        } else {
            res.send('Invalid credentials');
        }
    });
});

app.post('/order', (req, res) => {
    const { user_id, product_name, quantity } = req.body;
    const sql = 'INSERT INTO orders (user_id, product_name, quantity) VALUES (?, ?, ?)';
    db.query(sql, [user_id, product_name, quantity], (err, result) => {
        if (err) throw err;
        res.send('Order placed');
    });
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
