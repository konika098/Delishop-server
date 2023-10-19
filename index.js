
const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// const uri =`mongodb+srv://DeliShop:bPOceElhAFu7rA7V@cluster0.0yl10xg.mongodb.net/?retryWrites=true&w=majority;` 
var uri = `mongodb://${process.env.S3_BUCKET}:${process.env.S3_KEY}@ac-eadvqhz-shard-00-00.ycrlcva.mongodb.net:27017,ac-eadvqhz-shard-00-01.ycrlcva.mongodb.net:27017,ac-eadvqhz-shard-00-02.ycrlcva.mongodb.net:27017/?ssl=true&replicaSet=atlas-hbjutf-shard-0&authSource=admin&retryWrites=true&w=majority`;



const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect();

    const foodCollection = client.db('foodDB').collection('food')
    
    app.get('/food', async(req,res)=>{
      const cursor =foodCollection.find();
      const result = await cursor.toArray();
      res.send(result)
    })
    app.post('/food', async(req,res)=>{
      const newFood =req.body
      console.log(newFood)
      const result = await foodCollection.insertOne(newFood)
      res.send(result)
    })




    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
   
  }
}

run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('Server is running');
});

app.listen(port, () => {
  console.log(`delishop is coming, running on port ${port}`);
});