/* 
https://expressjs.com/
https://zellwk.com/blog/crud-express-mongodb/ 
*/
const express = require('express');
const { MongoClient } = require('mongodb');
const mongoClient = require('mongodb').MongoClient;
const mongoConnectionString = 'mongodb://localhost';

const app = express();
const port = 3000;
app.use(express.json());

//Database Connection
mongoClient.connect(mongoConnectionString, { useUnifiedTopology: true})
.then(client => {
    const db = client.db('testdb');
   
    app.get('/customers', (req, res) => {
        const customers = db.collection('customers').find().toArray()
        .then(results => {
            res.json(results);
        })
        .catch(error => console.error(error));
    });
    
    app.post('/customers', (req, res) => {
        res.json({
            "message": "post"
        });
    });
    
    app.put('/customers/:id', (req, res) => {
        const customerId = req.params.id;
        res.json({
            "message": 'put for customer id: ' + customerId
        });
    });
    
    app.delete('/customers/:id', (req, res) => {
        const customerId = req.params.id;
        res.json({
            "message": 'delete for customer id: ' + customerId
        });
    });
})
.catch(error => console.error(error));

   
app.listen(port, () => {
    console.log('app is listening on port ${port}');
});
