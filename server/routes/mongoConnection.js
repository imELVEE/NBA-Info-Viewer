const MONGO_KEY = process.env.MONGO_ANYWHERE_USER;
const User = require('./models/User');

var express = require('express');
var router = express.Router();

const mongoose = require('mongoose');
const uri = MONGO_KEY;

const clientOptions = { 
  dbName: 'NIV-data',
  serverApi: { version: '1', strict: true, deprecationErrors: true } 
};

var connected = 0;

router.get('/sign-in/:EMAIL', async function(req, res, next) {
  try {

    await mongoose.connect(uri, clientOptions);
    await mongoose.connection.db.admin().command({ ping: 1 });

    console.log("Pinged your deployment. You successfully connected to MongoDB!");
    
    connected++;
    const userExists = await User.exists({email: req.params.EMAIL});

    if (userExists)
    {
      const data = await User.findOne({email: req.params.EMAIL});
      res.send(data);
    }
    else
    {
      await User.create({email: req.params.EMAIL, teams: [], players: []});
      const data = await User.findOne({email: req.params.EMAIL});
      res.send(data);
    }

    connected--;
  }
  finally {
    if (connected.length === 0)
    {
      await mongoose.disconnect();
    }
  }
});

router.get('/add/team/:TEAMID/:USERID', async function(req, res, next) {
  try {

    await mongoose.connect(uri, clientOptions);
    await mongoose.connection.db.admin().command({ ping: 1 });

    console.log("Pinged your deployment. You successfully connected to MongoDB!");
    
    connected++;
    const updatedUser = await User.findByIdAndUpdate(
                                                    req.params.USERID,
                                                    {$push: {teams: req.params.TEAMID}},
                                                    {new: true},
                                                    {runValidators: true}
                                                    );

    res.send(updatedUser);
    connected--;
  }
  finally {
    if (connected.length === 0)
    {
      await mongoose.disconnect();
    }
  }
});

router.get('/add/player/:PLAYERID/:USERID', async function(req, res, next) {
  try {
 
    await mongoose.connect(uri, clientOptions);
    await mongoose.connection.db.admin().command({ ping: 1 });

    console.log("Pinged your deployment. You successfully connected to MongoDB!");
    
    connected++;
    const updatedUser = await User.findByIdAndUpdate(
                                                    req.params.USERID,
                                                    {$push: {players: req.params.PLAYERID}},
                                                    {new: true},
                                                    {runValidators: true}
                                                    );

    res.send(updatedUser);
    connected--;
  }
  finally {
    if (connected.length === 0)
    {
      await mongoose.disconnect();
    }
  }
});

router.get('/remove/team/:TEAMID/:USERID', async function(req, res, next) {
  try {

    await mongoose.connect(uri, clientOptions);
    await mongoose.connection.db.admin().command({ ping: 1 });

    console.log("Pinged your deployment. You successfully connected to MongoDB!");
    
    connected++;
    const updatedUser = await User.findByIdAndUpdate(
                                                    req.params.USERID,
                                                    {$pull: {teams: req.params.TEAMID}},
                                                    {new: true},
                                                    {runValidators: true}
                                                    );

    res.send(updatedUser);
    connected--;
  }
  finally {
    if (connected.length === 0)
    {
      await mongoose.disconnect();
    }
  }
});

router.get('/remove/player/:PLAYERID/:USERID', async function(req, res, next) {
  try {

    await mongoose.connect(uri, clientOptions);
    await mongoose.connection.db.admin().command({ ping: 1 });

    console.log("Pinged your deployment. You successfully connected to MongoDB!");
    
    connected++;
    const updatedUser = await User.findByIdAndUpdate(
                                                    req.params.USERID,
                                                    {$pull: {players: req.params.PLAYERID}},
                                                    {new: true},
                                                    {runValidators: true}
                                                    );

    res.send(updatedUser);
    connected--;
  }
  finally {
    if (connected.length === 0)
    {
      await mongoose.disconnect();
    }
  }
});

//run().catch(console.dir);

module.exports = router;

