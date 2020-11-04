const functions = require('firebase-functions');
const  express = require('express');
const admin = require('firebase-admin');
const app = express();

admin.initializeApp({
  credential: admin.credential.cert('./permisions.json'),
  databaseURL: "https://fb-apifunctionfire.firebaseio.com"
});

app.get('/hello-world', (req,res) => {
    return res.status(200).json({message: 'Hello World'})
})

//path 
app.use(require('./routes/products'));

exports.app = functions.https.onRequest(app);
