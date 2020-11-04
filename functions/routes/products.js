const {Router } = require('express');
const router = Router();
const admin = require('firebase-admin');


const db = admin.firestore()
router.post('/api/products', async (req,res) => {
    try {
      await db
        .collection('products')
        .doc('/' + req.body.id + '/')
        .create({name: req.body.name});
      return res.status(204).json();  //204 respuesta correcta
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  })
  
router.get('/api/products/:product_id', async (req,res) => {
    try {
      const doc =db.collection('products').doc(req.params.product_id);
        const item = await doc.get()
          const respuesta = item.data()
          return res.status(200).json(respuesta);
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
  });
  
router.get('/api/products', async (req,res) => {
   try {
      const query = db.collection('products');
      const querySnapshot = await query.get(); //array de los datos
      const docs = querySnapshot.docs;
      const respuesta = docs.map(doc => ({
        id: doc.id,
        name: doc.data.name
      }))
  
      return res.status(200).json(respuesta)
   } catch (error) {
      // console.log(error);
      return res.status(500).send(error);
   }
  
  
  })
  
router.delete('/api/products/:product_id', async (req,res) => {
    try {
       const document = db.collection('products').doc(req.params.product_id);
      await document.delete();
      return res.status(200).json()
    } catch (error) {
      return res.status(500).send(error);
    }
  });
  
  
router.put('/api/products/:product_id', async (req,res) => {
    try {
      const document = db.collection('products').doc(req.params.product_id)
      document.update({name: req.body.name});
      return res.status(200).json();
    } catch (error) {
      return res.status(500).send(error);
    }
  })


module.exports = router;