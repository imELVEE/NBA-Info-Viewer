const MONGO_KEY = process.env.MONGO_URI;
const User = require('./models/User');

var express = require('express');
var router = express.Router();

const mongoose = require('mongoose');
const uri = MONGO_KEY;

const clientOptions = { 
  dbName: 'NIV-data',
  serverApi: { version: '1', strict: true, deprecationErrors: true } 
};

/*
async function run() {
  try {
    // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
    await mongoose.connect(uri, clientOptions);
    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await mongoose.disconnect();
  }
}
*/

router.get('/sign-in/:EMAIL', async function(req, res, next) {
  try {
    await mongoose.connect(uri, clientOptions);
    await mongoose.connection.db.admin().command({ ping: 1 });

    console.log("Pinged your deployment. You successfully connected to MongoDB!");
    const userExists = await User.exists({email: req.params.EMAIL});

    if (userExists)
    {
      const data = await User.findOne({email: req.params.EMAIL});
      res.send(data);
    }
    else
    {
      await User.create({email: req.params.EMAIL, teams: [17, 6, 57], players: [25, 31, 13]});
      const data = await User.findOne({email: req.params.EMAIL});
      res.send(data);
    }
  }
  finally {
    await mongoose.disconnect();
  }
});

//run().catch(console.dir);

module.exports = router;

