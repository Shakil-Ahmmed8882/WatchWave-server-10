const express = require("express");
const app = express();
const port = process.env.PORT || 1000;
const cors = require("cors");
require("dotenv").config();

// middle ware
app.use(cors());
app.use(express.json());

// =======================================

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.sk8jxpx.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const database = client.db("WatchWave");
    const BrandsCollection = database.collection("BrandsCollection");

    app.get("/", async (req, res) => {
      const result = await BrandsCollection.find().toArray();
      res.send(result);
      // res.send('hi hi')
    });

    app.get("/brand/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await BrandsCollection.findOne(query);
      res.send(result);
    });

    app.post("/addBrand", async (req, res) => {
      const brand = req.body;
    });

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

//=======================================

// Start the server on the specified port.
app.listen(port, () => {
  console.log(`Server is running on port:${port}`);
});
