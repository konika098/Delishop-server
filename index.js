
const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// const uri =`mongodb+srv://DeliShop:bPOceElhAFu7rA7V@cluster0.0yl10xg.mongodb.net/?retryWrites=true&w=majority;` 
var uri = "mongodb://DeliShopSer:cRdcgpesbuMuYOim@ac-eadvqhz-shard-00-00.ycrlcva.mongodb.net:27017,ac-eadvqhz-shard-00-01.ycrlcva.mongodb.net:27017,ac-eadvqhz-shard-00-02.ycrlcva.mongodb.net:27017/?ssl=true&replicaSet=atlas-hbjutf-shard-0&authSource=admin&retryWrites=true&w=majority";



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