// Import expess, cors, dotenv and mongodb
const express = require('express');
const app = express();
const { MongoClient } = require('mongodb');
const cors = require('cors');
const port = process.env.PORT || 4000;
require('dotenv').config()

// use cors and json
app.use(cors());
app.use(express.json());

// define uri with environment variables
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ha2x2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

// Create client with uri
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// Create run function with try, catch for connect mongodb
async function run() {
    try {
        await client.connect();
        console.log("connect success")
        const database = client.db("blackcoper");
        const recordData = database.collection("rcorddata");

        app.get("/data", async (req, res) => {
            const result = await recordData.find({}).toArray();
            res.json(result);
        })

    } finally {
        //   final expression
    }
}

// Call run function and console error messages.
run().catch(console.dir);

app.listen(port, () => {
    console.log("this is running on port", port);
});